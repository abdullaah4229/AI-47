'use client'

import Link from 'next/link'
import { useActionState, useRef, useState } from 'react'
import { submitContact, type FormState } from '@/app/(frontend)/actions'
import { SpamFields } from './SpamFields'

const INDUSTRIES = ['Real Estate', 'Law Firm', 'E-Commerce', 'Healthcare Administration', 'Professional Services', 'Marketing Agency', 'Restaurants & Hospitality', 'Retail', 'Financial Services', 'Education', 'Startup', 'Other']

const Err = ({ id, msg }: { id: string; msg?: string }) =>
  msg ? (
    <div className="field-err" id={id} role="alert">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v5 M12 16v.5" /></svg>
      {msg}
    </div>
  ) : null

export function ContactForm({ services, bookingUrl }: { services: string[]; bookingUrl?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { ok: false })
  const [reset, setReset] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const e = state.errors || {}

  if (state.ok && reset === 0) {
    return (
      <div className="form-success" role="status">
        <div className="success-orb" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 className="h-3" style={{ fontSize: 32, marginTop: 24 }}>Request received.</h2>
        <p className="muted" style={{ maxWidth: 440, margin: '12px auto 0' }}>
          Thank you{state.message ? `, ${state.message}` : ''}. A member of our team will reply by email soon.
        </p>
        {bookingUrl && (
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 26 }}>Skip the wait — pick a time</a>
        )}
        <button type="button" className="link-btn" onClick={() => setReset((r) => r + 1)}>Send another message</button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={action} className="lead-form grad-border" noValidate key={reset} aria-describedby={state.message ? 'form-msg' : undefined}>
      <SpamFields />
      {state.message && !state.ok && <p id="form-msg" className="form-msg" role="alert">{state.message}</p>}
      <div className="form-grid">
        <div>
          <label className="flabel" htmlFor="c-name">Full name <span aria-hidden="true" className="req">*</span></label>
          <input className={`field${e.name ? ' is-bad' : ''}`} id="c-name" name="name" type="text" autoComplete="name" required aria-invalid={!!e.name} aria-describedby="c-name-err" />
          <Err id="c-name-err" msg={e.name} />
        </div>
        <div>
          <label className="flabel" htmlFor="c-email">Business email <span aria-hidden="true" className="req">*</span></label>
          <input className={`field${e.email ? ' is-bad' : ''}`} id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!e.email} aria-describedby="c-email-err" />
          <Err id="c-email-err" msg={e.email} />
        </div>
        <div>
          <label className="flabel" htmlFor="c-co">Company name</label>
          <input className="field" id="c-co" name="company" type="text" autoComplete="organization" />
        </div>
        <div>
          <label className="flabel" htmlFor="c-ph">Phone <span className="muted">(optional)</span></label>
          <input className={`field${e.phone ? ' is-bad' : ''}`} id="c-ph" name="phone" type="tel" autoComplete="tel" aria-invalid={!!e.phone} aria-describedby="c-ph-err" />
          <Err id="c-ph-err" msg={e.phone} />
        </div>
        <div>
          <label className="flabel" htmlFor="c-ind">Industry</label>
          <select className="field" id="c-ind" name="industry" defaultValue="">
            <option value="">Select your industry</option>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="flabel" htmlFor="c-svc">Service interested in</label>
          <select className="field" id="c-svc" name="service" defaultValue="">
            <option value="">Select a service</option>
            {services.map((s) => <option key={s}>{s}</option>)}
            <option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <label className="flabel" htmlFor="c-ch">Biggest business challenge</label>
        <input className="field" id="c-ch" name="challenge" type="text" placeholder="e.g. Too much time spent on lead follow-up" />
      </div>
      <div style={{ marginTop: 20 }}>
        <label className="flabel" htmlFor="c-msg">Message</label>
        <textarea className="field" id="c-msg" name="message" rows={4} placeholder="Tell us about your goals" />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
          {pending && <span className="spinner" aria-hidden="true" />}
          {pending ? 'Sending…' : 'Request Free Consultation'}
        </button>
        <span className="muted" style={{ fontSize: 13 }}>Required fields are marked *</span>
      </div>
      <p className="form-privacy">We use your details only to respond to your inquiry and never sell your information. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
    </form>
  )
}
