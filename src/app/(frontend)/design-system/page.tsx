import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Design System', robots: { index: false, follow: false } }

const colors = [
  ['Deep Space Black', '#050505'],
  ['Dark Navy', '#080D1A'],
  ['Midnight Blue', '#101827'],
  ['Electric Blue', '#2563EB'],
  ['Neon Cyan', '#00E5FF'],
  ['Electric Purple', '#8B5CF6'],
  ['White', '#FFFFFF'],
  ['Secondary Gray', '#A1A1AA'],
]

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** Internal reference page for reviewing the building blocks. Not indexed by search engines. */
export default function DesignSystemPage() {
  return (
    <div className="container section">
      <p className="eyebrow">Internal reference</p>
      <h1 className="h-1" style={{ marginTop: 16 }}>Design <span className="grad">system.</span></h1>
      <p className="lead" style={{ marginTop: 20 }}>Every page in the next milestones is built from these pieces. Hover the cards and buttons to try the interactions.</p>

      <section className="reveal" style={{ marginTop: 72 }} aria-labelledby="c-h">
        <h2 id="c-h" className="h-3">Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginTop: 20 }}>
          {colors.map(([name, hex]) => (
            <div key={hex} className="surface" style={{ overflow: 'hidden' }}>
              <div style={{ height: 80, background: hex, borderBottom: '1px solid var(--line)' }} />
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                <div className="mono-small">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal" style={{ marginTop: 72 }} aria-labelledby="t-h">
        <h2 id="t-h" className="h-3">Typography</h2>
        <div className="surface" style={{ padding: 32, marginTop: 20, display: 'grid', gap: 22 }}>
          <div><span className="mono-small">Space Grotesk · hero</span><div className="h-hero">Intelligence <span className="grad">that works.</span></div></div>
          <div><span className="mono-small">Space Grotesk · section heading</span><div className="h-2">Less manual work.</div></div>
          <div><span className="mono-small">Inter · lead paragraph</span><p className="lead" style={{ margin: 0 }}>Transform the way you work with intelligent automation designed to accelerate your business growth.</p></div>
          <div><span className="mono-small">JetBrains Mono · technical labels</span><div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-text)' }}>&gt; ai742.workflow.run(&quot;lead-to-booking&quot;)</div></div>
        </div>
      </section>

      <section className="reveal" style={{ marginTop: 72 }} aria-labelledby="b-h">
        <h2 id="b-h" className="h-3">Buttons and links</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 20 }}>
          <Link href="/contact" className="btn btn-primary magnetic">Book Free Consultation <Arrow /></Link>
          <Link href="/services" className="btn btn-ghost magnetic">Explore Our Solutions</Link>
          <Link href="/contact" className="btn btn-light magnetic">Let&apos;s Build Your AI Future</Link>
          <Link href="/services" className="more">Learn more <Arrow /></Link>
        </div>
      </section>

      <section style={{ marginTop: 72 }} aria-labelledby="k-h">
        <h2 id="k-h" className="h-3 reveal">Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20, marginTop: 20 }}>
          {['AI Receptionist', 'AI Automation', 'AI Consulting'].map((t, i) => (
            <div key={t} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <article className="card spot grad-border" style={{ borderRadius: 22, padding: 30, minHeight: 220, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span className="mono-small">0{i + 1}</span>
                <h3 className="h-3">{t}</h3>
                <p className="muted" style={{ margin: 0, flexGrow: 1 }}>Hover to see the 3D tilt and the spotlight border that follows your cursor.</p>
                <Link href="/services" className="more" style={{ alignSelf: 'flex-start' }}>Learn more <Arrow /></Link>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
