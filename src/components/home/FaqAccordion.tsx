'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/home'

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.question} className="faq-row reveal" style={{ transitionDelay: `${(i % 5) * 80}ms` }}>
            <h3>
              <button
                type="button"
                className="faq-btn"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq-q">
                  <span className="mono-small">{String(i + 1).padStart(2, '0')}</span>
                  {f.question}
                </span>
                <span className={`faq-icon${isOpen ? ' is-open' : ''}`} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
            </h3>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
              <p className="faq-a">{f.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
