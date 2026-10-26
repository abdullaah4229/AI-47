// Static-hosting (GitHub Pages) stand-in for ./actions.ts — there is no server to save leads,
// so each form opens the visitor's email app with their details filled in.
// scripts/build-static.mjs copies this file over actions.ts before a static export.

export type FormState = { ok: boolean; message?: string; errors?: Record<string, string> }

const TO = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const val = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

function openEmail(subject: string, rows: [string, string][]) {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Contact page form. */
export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const name = val(fd, 'name')
  const email = val(fd, 'email')
  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (Object.keys(errors).length) return { ok: false, errors, message: 'Please check the highlighted fields.' }
  const company = val(fd, 'company')
  openEmail(`Consultation request — ${name}${company ? ` (${company})` : ''}`, [
    ['Name', name], ['Email', email], ['Company', company], ['Phone', val(fd, 'phone')], ['Industry', val(fd, 'industry')],
    ['Service', val(fd, 'service')], ['Challenge', val(fd, 'challenge')], ['Message', val(fd, 'message')],
  ])
  return { ok: true, message: name.split(' ')[0] }
}

/** AI readiness assessment: "email my results". */
export async function submitAssessment(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = val(fd, 'email')
  if (!EMAIL_RE.test(email)) return { ok: false, errors: { email: 'Please enter a valid email address.' } }
  let answers: { q: string; a: string }[] = []
  try { answers = JSON.parse(val(fd, 'answers')) } catch {}
  openEmail(`AI readiness assessment — ${val(fd, 'score')}/100 (${val(fd, 'level')})`, [
    ['Name', val(fd, 'name')], ['Email', email], ['Score', `${val(fd, 'score')}/100`], ['Level', val(fd, 'level')],
    ...(Array.isArray(answers) ? answers.map((x) => [x.q, x.a] as [string, string]) : []),
  ])
  return { ok: true }
}

/** Blog newsletter sign-up. */
export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = val(fd, 'email')
  if (!EMAIL_RE.test(email)) return { ok: false, errors: { email: 'Please enter a valid email address.' } }
  openEmail('Newsletter sign-up', [['Email', email]])
  return { ok: true }
}
