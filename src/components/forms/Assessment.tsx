'use client'

import Link from 'next/link'
import { useActionState, useMemo, useState } from 'react'
import { submitAssessment, type FormState } from '@/app/(frontend)/actions'
import { SpamFields } from './SpamFields'

type Opt = [label: string, score: number, tag: string]
const Q: [string, Opt[]][] = [
  ['How much time does your team spend on repetitive admin each week?', [['Less than 2 hours', 1, ''], ['2–10 hours', 2, 'automation'], ['10–20 hours', 3, 'automation'], ['More than 20 hours', 3, 'automation']]],
  ['What happens to calls your team can’t answer?', [['Most go to voicemail', 3, 'receptionist'], ['An answering service takes them', 2, 'receptionist'], ['Someone always picks up', 1, ''], ['We rarely get calls', 0, '']]],
  ['How quickly do you follow up with new leads?', [['Within minutes', 1, ''], ['Same day', 2, 'leads'], ['Next day or later', 3, 'leads'], ['We don’t track leads', 3, 'leads']]],
  ['Where does your customer information live?', [['In a CRM', 3, ''], ['In spreadsheets', 2, ''], ['In email and notes', 1, ''], ['Nowhere central', 0, 'consulting']]],
  ['Has your team used AI tools like ChatGPT or Claude?', [['Yes, daily', 3, ''], ['Occasionally', 2, ''], ['Tried once or twice', 1, 'consulting'], ['Not yet', 0, 'consulting']]],
  ['What’s your main goal for AI?', [['Save time on admin', 2, 'automation'], ['Win more leads', 2, 'leads'], ['Better customer service', 2, 'chatbot'], ['Not sure yet', 2, 'consulting']]],
]
const MAX = 17
const R: Record<string, { title: string; text: string; href: string }> = {
  receptionist: { title: 'AI Receptionist', text: 'Stop losing callers to voicemail with a 24/7 AI answering service.', href: '/services/ai-receptionist' },
  automation: { title: 'AI Automation', text: 'Hand repetitive admin to automated workflows.', href: '/services/ai-automation' },
  leads: { title: 'AI Lead Generation', text: 'Respond to and qualify every lead within minutes.', href: '/services/ai-lead-generation' },
  chatbot: { title: 'AI Chatbot', text: 'Answer customer questions instantly, any hour.', href: '/services/ai-chatbots' },
  consulting: { title: 'AI Consulting', text: 'Start with a roadmap that shows where AI fits your business.', href: '/services/ai-consulting' },
}

export function Assessment() {
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState(0)
  const [state, action, pending] = useActionState<FormState, FormData>(submitAssessment, { ok: false })
  const done = step >= Q.length

  const result = useMemo(() => {
    if (!done) return null
    let total = 0
    const tags: Record<string, number> = {}
    answers.forEach((a, i) => {
      const o = Q[i][1][a]
      total += o[1]
      if (o[2]) tags[o[2]] = (tags[o[2]] || 0) + 1
    })
    const score = Math.round((total / MAX) * 100)
    const level = score >= 70 ? 'Ready to Scale' : score >= 40 ? 'Ready to Start' : 'Exploring'
    const text = score >= 70
      ? 'Your business has clear opportunities and solid foundations. You could see value from AI automation quickly.'
      : score >= 40 ? 'You have real opportunities for AI. A focused first project is the best way to start.'
      : 'You’re early in your AI journey. A short consulting session will show you where to begin.'
    const order = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
    for (const k of ['consulting', 'automation']) if (order.length < 2 && !order.includes(k)) order.push(k)
    return { score, level, text, recs: order.slice(0, 2).map((k) => R[k]), qa: answers.map((a, i) => ({ q: Q[i][0], a: Q[i][1][a][0] })) }
  }, [done, answers])

  if (result) {
    return (
      <div className="assess-card" aria-live="polite">
        <div className="center">
          <div className="mono-small" style={{ color: 'var(--cyan-soft)', letterSpacing: '.16em' }}>Your result</div>
          <div className="gauge">
            <svg viewBox="0 0 200 200" role="img" aria-label={`Readiness score ${result.score} out of 100`}>
              <defs><linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="12" />
              <circle cx="100" cy="100" r="84" fill="none" stroke="url(#gaugeG)" strokeWidth="12" strokeLinecap="round" pathLength={100} className="gauge-arc" style={{ strokeDasharray: `${result.score} 100` }} />
            </svg>
            <div className="gauge-num"><span>{result.score}</span><small>out of 100</small></div>
          </div>
          <h2 className="h-2" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', marginTop: 22 }}>{result.level}</h2>
          <p className="muted" style={{ maxWidth: 520, margin: '12px auto 0' }}>{result.text}</p>
        </div>
        <div style={{ marginTop: 32 }}>
          <div className="mono-small" style={{ color: 'var(--purple-soft)', letterSpacing: '.16em' }}>Where to start</div>
          <div className="recs">
            {result.recs.map((r) => (
              <Link key={r.title} href={r.href} className="card rec"><span className="h-3" style={{ fontSize: 18 }}>{r.title}</span><span className="muted" style={{ fontSize: 14 }}>{r.text}</span></Link>
            ))}
          </div>
        </div>
        <div className="assess-email">
          {state.ok ? (
            <p className="nl-done" role="status">✓ Thanks! We’ve received your results and will follow up by email with next steps.</p>
          ) : (
            <form action={action} noValidate className="assess-form">
              <SpamFields />
              <input type="hidden" name="score" value={result.score} />
              <input type="hidden" name="level" value={result.level} />
              <input type="hidden" name="answers" value={JSON.stringify(result.qa)} />
              <p className="muted" style={{ margin: 0, flexBasis: '100%', textAlign: 'center' }}>Want a personal follow-up on your result? Leave your details.</p>
              <label htmlFor="as-name" className="sr-only">Your name</label>
              <input id="as-name" name="name" autoComplete="name" placeholder="Your name" className="field field--pill" />
              <label htmlFor="as-email" className="sr-only">Business email</label>
              <input id="as-email" name="email" type="email" autoComplete="email" placeholder="Business email" className={`field field--pill${state.errors?.email ? ' is-bad' : ''}`} aria-invalid={!!state.errors?.email} aria-describedby="as-err" required />
              <button type="submit" className="btn btn-light" disabled={pending}>{pending ? 'Sending…' : 'Send My Results'}</button>
              {(state.errors?.email || state.message) && <p id="as-err" className="field-err" role="alert" style={{ flexBasis: '100%', justifyContent: 'center' }}>{state.errors?.email || state.message}</p>}
            </form>
          )}
        </div>
        <div className="row-actions" style={{ justifyContent: 'center' }}>
          <Link href="/contact" className="btn btn-primary">Discuss My Results with an AI Consultant</Link>
          <button type="button" className="link-btn" onClick={() => { setAnswers([]); setStep(0) }}>Retake assessment</button>
        </div>
        <p className="mono-small center" style={{ marginTop: 18 }}>This assessment is a general guide, not a professional audit.</p>
      </div>
    )
  }

  const pct = Math.round((step / Q.length) * 100)
  const [question, opts] = Q[step]
  return (
    <div className="assess-card">
      <div className="assess-top"><span className="mono-small">Question {step + 1} of {Q.length}</span><span className="mono-small">{pct}%</span></div>
      <div className="assess-bar" aria-hidden="true"><span style={{ width: `${Math.max(4, pct)}%` }} /></div>
      <fieldset className="assess-q" key={step}>
        <legend className="h-3">{question}</legend>
        <div className="assess-opts">
          {opts.map(([label], i) => (
            <button
              key={label}
              type="button"
              className={`assess-opt${answers[step] === i ? ' is-on' : ''}`}
              aria-pressed={answers[step] === i}
              onClick={() => { const a = answers.slice(); a[step] = i; setAnswers(a); setStep(step + 1) }}
            >
              <span className="opt-dot" aria-hidden="true" />{label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="assess-foot">
        {step > 0 ? <button type="button" className="link-btn" onClick={() => setStep(step - 1)}>← Back</button> : <span />}
        <span className="muted" style={{ fontSize: 13 }}>About 2 minutes · No sign-up needed</span>
      </div>
    </div>
  )
}
