'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Arrow, Icon } from '../Icon'
import type { IndustryPage } from '@/lib/pages'

/** Pick an industry on the left, see where AI helps on the right. Each industry links to its own page. */
export function IndustryExplorer({ industries }: { industries: IndustryPage[] }) {
  const [sel, setSel] = useState(0)
  const cur = industries[sel]
  if (!cur) return null
  const num = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <div className="explorer">
      <div className="explorer-list" role="tablist" aria-label="Industries">
        {industries.map((ind, i) => (
          <button
            key={ind.slug}
            type="button"
            role="tab"
            id={`ind-tab-${i}`}
            aria-selected={i === sel}
            aria-controls="ind-panel"
            className={`explorer-tab${i === sel ? ' is-on' : ''}`}
            onClick={() => setSel(i)}
          >
            <Icon name={ind.icon} size={20} color={i === sel ? '#00E5FF' : '#A1A1AA'} />
            <span>{ind.name}</span>
            <span className="mono-small">{num(i)}</span>
          </button>
        ))}
      </div>

      <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${sel}`} className="explorer-panel" key={cur.slug}>
        <div className="explorer-top">
          <div>
            <div className="mono-small" style={{ color: 'var(--cyan-soft)' }}>Industry {num(sel)} / {industries.length}</div>
            <h2 className="h-2 explorer-name">{cur.name}</h2>
          </div>
          <span className="explorer-ico" aria-hidden="true"><Icon name={cur.icon} size={32} color="#67E8F9" strokeWidth={1.5} /></span>
        </div>
        <p className="explorer-text">{cur.summary}</p>

        <h3 className="explorer-label">Automation opportunities</h3>
        <ul className="explorer-opps">
          {cur.useCases.slice(0, 4).map((u) => <li key={u.title}><span className="opp-dot" />{u.title}</li>)}
        </ul>

        {cur.flow.length > 0 && (
          <>
            <h3 className="explorer-label">Example workflow <span style={{ color: 'var(--faint)' }}>· illustrative</span></h3>
            <ol className="mini-flow">
              {cur.flow.map((f, i) => (
                <li key={f}>
                  <div className="mini-step"><span className="mono-small" style={{ color: '#c4b5fd' }}>{num(i)}</span><span>{f}</span></div>
                  {i < cur.flow.length - 1 && <span className="mini-arrow" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </>
        )}

        {cur.note && <p className="notice" role="note">{cur.note}</p>}

        <div className="row-actions">
          <Link href={`/industries/${cur.slug}`} className="btn btn-primary magnetic">AI for {cur.name}<Arrow size={18} /></Link>
          <Link href="/contact" className="more">Discuss your business<Arrow size={14} /></Link>
        </div>
      </div>
    </div>
  )
}
