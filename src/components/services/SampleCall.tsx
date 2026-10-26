'use client'

import { useEffect, useState } from 'react'

const LINES = [
  ['Caller', 'Hi, do you have any openings this week?', 'c'],
  ['AI receptionist', 'Yes — I have Thursday at 10am or Friday at 2pm. Which works better for you?', 'a'],
  ['Caller', 'Friday at 2 works.', 'c'],
  ['AI receptionist', 'You’re booked for Friday at 2pm. I’ll text you a confirmation now.', 'a'],
  ['System', '✓ Added to calendar   ✓ Confirmation text sent   ✓ Summary emailed', 's'],
] as const

/** Illustrative call transcript that plays line by line, then loops. */
export function SampleCall() {
  const [n, setN] = useState<number>(LINES.length)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setN(1)
    const t = setInterval(() => setN((v) => (v >= LINES.length + 2 ? 1 : v + 1)), 1500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="call" role="img" aria-label="Sample call: an AI receptionist books an appointment and sends a confirmation text">
      <div className="call-head">
        <span className="call-avatar"><span /></span>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontWeight: 600 }}>Incoming call</div>
          <div className="mono-small" style={{ color: 'var(--cyan-text)' }}>AI receptionist · answered on first ring</div>
        </div>
        <span className="pill-sample">Sample</span>
      </div>
      <div className="call-wave" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} style={{ animationDuration: `${(0.8 + (i % 5) * 0.17).toFixed(2)}s`, animationDelay: `${(-(i * 0.13)).toFixed(2)}s` }} />
        ))}
      </div>
      <div className="call-lines" aria-hidden="true">
        {LINES.slice(0, Math.min(n, LINES.length)).map(([who, text, kind]) => (
          <div key={text} className={`call-line call-line--${kind}`}>
            <span className="call-who">{who}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
