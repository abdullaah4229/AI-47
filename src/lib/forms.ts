import 'server-only'
import { headers } from 'next/headers'

/** Very small in-memory rate limiter (one server instance — fine for a single VPS process). */
const hits = new Map<string, number[]>()
export function rateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now()
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs)
  list.push(now)
  hits.set(key, list)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  return list.length > max
}

export async function clientIp() {
  const h = await headers()
  return (h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || 'unknown').trim()
}

export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/
export const clean = (v: FormDataEntryValue | null | undefined, max = 500) =>
  String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

/** Spam checks: hidden "website" field must stay empty, and the form must not be submitted instantly. */
export function looksLikeSpam(fd: FormData) {
  if (clean(fd.get('website'))) return true
  const started = Number(fd.get('startedAt'))
  return !started || Date.now() - started < 2500
}

export const notifyAddress = (fallback?: string) => process.env.NOTIFY_EMAIL || fallback || ''
