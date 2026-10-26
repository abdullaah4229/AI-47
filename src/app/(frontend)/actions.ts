'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { clean, clientIp, EMAIL_RE, escapeHtml, looksLikeSpam, notifyAddress, rateLimited } from '@/lib/forms'
import { getSiteData } from '@/lib/site'

export type FormState = { ok: boolean; message?: string; errors?: Record<string, string> }

const GENERIC_ERROR = 'Something went wrong on our side. Please try again, or email us directly.'

async function notify(subject: string, rows: [string, string | number | undefined][], replyTo?: string) {
  const payload = await getPayload({ config })
  const site = await getSiteData()
  const to = notifyAddress(site.contactEmail)
  if (!to) return
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
    <h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">${rows
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`)
      .join('')}</table>
    <p style="color:#666;margin-top:16px">View and manage leads in your admin panel → Leads.</p></div>`
  try {
    await payload.sendEmail({ to, subject, html, ...(replyTo ? { replyTo } : {}) })
  } catch (err) {
    payload.logger.error({ err }, 'Lead notification email failed (the lead is still saved in the admin panel).')
  }
}

/** Contact page form. */
export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (looksLikeSpam(fd)) return { ok: true, message: 'Thanks — we’ll be in touch soon.' } // quietly ignore bots
  const ip = await clientIp()
  if (rateLimited(`contact:${ip}`, 5, 60 * 60 * 1000)) return { ok: false, message: 'Too many requests. Please try again later, or email us directly.' }

  const data = {
    name: clean(fd.get('name'), 120),
    email: clean(fd.get('email'), 200).toLowerCase(),
    company: clean(fd.get('company'), 160),
    phone: clean(fd.get('phone'), 40),
    industry: clean(fd.get('industry'), 80),
    service: clean(fd.get('service'), 80),
    challenge: clean(fd.get('challenge'), 300),
    message: clean(fd.get('message'), 4000),
  }
  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (data.phone && !/^[0-9+().\-\s]{7,40}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (Object.keys(errors).length) return { ok: false, errors, message: 'Please check the highlighted fields.' }

  try {
    const payload = await getPayload({ config })
    await payload.create({ collection: 'leads', data: { ...data, source: 'contact', status: 'new' } })
  } catch (err) {
    console.error('[AI 742] Could not save lead', err)
    return { ok: false, message: GENERIC_ERROR }
  }
  await notify(`New consultation request — ${data.name}${data.company ? ` (${data.company})` : ''}`, [
    ['Name', data.name], ['Email', data.email], ['Company', data.company], ['Phone', data.phone], ['Industry', data.industry],
    ['Service', data.service], ['Challenge', data.challenge], ['Message', data.message],
  ], data.email)
  return { ok: true, message: data.name.split(' ')[0] }
}

/** AI readiness assessment: "email my results". */
export async function submitAssessment(_prev: FormState, fd: FormData): Promise<FormState> {
  if (looksLikeSpam(fd)) return { ok: true }
  const ip = await clientIp()
  if (rateLimited(`assessment:${ip}`, 5, 60 * 60 * 1000)) return { ok: false, message: 'Too many requests. Please try again later.' }
  const email = clean(fd.get('email'), 200).toLowerCase()
  const name = clean(fd.get('name'), 120)
  const score = Math.max(0, Math.min(100, Number(fd.get('score')) || 0))
  const level = clean(fd.get('level'), 40)
  let answers: unknown = []
  try { answers = JSON.parse(clean(fd.get('answers'), 4000)) } catch {}
  if (!EMAIL_RE.test(email)) return { ok: false, errors: { email: 'Please enter a valid email address.' } }
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'leads',
      data: { name: name || email, email, source: 'assessment', status: 'new', assessmentScore: score, assessmentLevel: level, assessmentAnswers: answers as never },
    })
  } catch (err) {
    console.error('[AI 742] Could not save assessment lead', err)
    return { ok: false, message: GENERIC_ERROR }
  }
  const lines = Array.isArray(answers) ? (answers as { q: string; a: string }[]).map((x) => [x.q, x.a] as [string, string]) : []
  await notify(`New AI readiness assessment — ${score}/100 (${level})`, [['Name', name], ['Email', email], ['Score', `${score}/100`], ['Level', level], ...lines], email)
  return { ok: true }
}

/** Blog newsletter sign-up. */
export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  if (looksLikeSpam(fd)) return { ok: true }
  const ip = await clientIp()
  if (rateLimited(`subscribe:${ip}`, 5, 60 * 60 * 1000)) return { ok: false, message: 'Too many requests. Please try again later.' }
  const email = clean(fd.get('email'), 200).toLowerCase()
  if (!EMAIL_RE.test(email)) return { ok: false, errors: { email: 'Please enter a valid email address.' } }
  try {
    const payload = await getPayload({ config })
    const existing = await payload.find({ collection: 'subscribers', where: { email: { equals: email } }, limit: 1 })
    if (existing.docs[0]) {
      if (existing.docs[0].unsubscribed) await payload.update({ collection: 'subscribers', id: existing.docs[0].id, data: { unsubscribed: false } })
    } else {
      await payload.create({ collection: 'subscribers', data: { email, source: clean(fd.get('source'), 80) || 'blog' } })
    }
  } catch (err) {
    console.error('[AI 742] Could not save subscriber', err)
    return { ok: false, message: GENERIC_ERROR }
  }
  return { ok: true }
}
