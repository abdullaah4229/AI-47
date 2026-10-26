'use client'

import { useEffect, useState } from 'react'
import { Icon } from '../Icon'

const STEPS = [
  ['Customer Inquiry', 'msg', 'inbound.message received → "Do you offer weekend appointments?"', 'A visitor asks a question on your website, any hour of the day.'],
  ['AI Chatbot', 'bot', 'agent.chat answering from approved business knowledge…', 'The assistant replies instantly using information you have approved.'],
  ['Lead Qualification', 'filter', 'agent.qualify → budget ✓  timeline ✓  service ✓', 'A few natural questions capture what the visitor needs and when.'],
  ['CRM Integration', 'db', 'crm.contact.upsert → record created with conversation summary', 'The lead and a conversation summary land in your CRM automatically.'],
  ['Automated Follow-Up', 'mail', 'email.send → personalised recap + next steps', 'A personalised follow-up goes out while interest is high.'],
  ['Appointment Booking', 'cal', 'calendar.book → discovery call confirmed', 'Open slots are offered and the call is booked on your calendar.'],
] as const

/** Illustrative lead-to-booking workflow that steps through on its own; any step can be clicked. */
export function WorkflowDemo() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1900)
    return () => clearInterval(t)
  }, [paused])

  const active = STEPS[step]
  return (
    <div className="flow spot" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flow-track" aria-hidden="true">
        <div className="flow-progress" style={{ width: `${Math.round(((step + 1) / STEPS.length) * 100)}%` }} />
      </div>
      <ol className="flow-steps">
        {STEPS.map(([label, icon], i) => (
          <li key={label}>
            <button
              type="button"
              className={`flow-step${i === step ? ' is-active' : i < step ? ' is-done' : ''}`}
              aria-pressed={i === step}
              onClick={() => setStep(i)}
            >
              <span className="mono-small">Step 0{i + 1}</span>
              <Icon name={icon} size={26} color={i === step ? '#fff' : i < step ? '#67E8F9' : '#A1A1AA'} />
              <span className="flow-label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-detail">
        <div className="flow-log" aria-live="polite">
          <div className="muted">&gt; ai742.workflow.run(<span style={{ color: 'var(--cyan-text)' }}>&quot;lead-to-booking&quot;</span>)</div>
          <div>&gt; {active[2]}<span className="caret caret-sm" aria-hidden="true" /></div>
        </div>
        <div className="flow-copy">
          <h3 className="h-3">{active[0]}</h3>
          <p className="muted">{active[3]}</p>
          <p className="muted" style={{ fontSize: 14 }}>One inquiry, six steps, zero copy-pasting — your team steps in only where judgment matters.</p>
        </div>
      </div>
    </div>
  )
}
