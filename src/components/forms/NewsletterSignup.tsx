'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { subscribe, type FormState } from '@/app/(frontend)/actions'
import { SpamFields } from './SpamFields'

export function NewsletterSignup({ source = 'blog' }: { source?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { ok: false })
  return (
    <section className="container" aria-labelledby="nl-h" style={{ paddingBottom: 90 }}>
      <div className="newsletter reveal">
        <div style={{ flex: '1 1 380px' }}>
          <h2 id="nl-h" className="h-3" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>Get new posts in your inbox.</h2>
          <p className="muted" style={{ margin: '10px 0 0' }}>Practical AI for small business. No spam — unsubscribe anytime.</p>
        </div>
        {state.ok ? (
          <p className="nl-done" role="status">✓ You’re subscribed. Thanks for reading!</p>
        ) : (
          <form action={action} className="nl-form" noValidate>
            <SpamFields />
            <input type="hidden" name="source" value={source} />
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={`field field--pill${state.errors?.email ? ' is-bad' : ''}`} aria-invalid={!!state.errors?.email} aria-describedby="nl-err" required />
            <button type="submit" className="btn btn-light" disabled={pending}>{pending ? 'Subscribing…' : 'Subscribe'}</button>
            <p id="nl-err" className="nl-note" role={state.errors?.email || state.message ? 'alert' : undefined}>
              {state.errors?.email || state.message || <>By subscribing you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.</>}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
