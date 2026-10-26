import type { Metadata } from 'next'
import Link from 'next/link'
import '../services.css'
import '../pages.css'

import { Arrow } from '@/components/Icon'
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { getHowItWorks } from '@/lib/pages'
import { getHomeData } from '@/lib/home'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHowItWorks()
  return { title: h.metaTitle, description: h.metaDescription, alternates: { canonical: '/how-it-works' }, openGraph: { title: `${h.metaTitle} | AI 742`, description: h.metaDescription, url: '/how-it-works' } }
}

export default async function HowItWorksPage() {
  const [h, { home }] = await Promise.all([getHowItWorks(), getHomeData()])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="svc-page">
      <JsonLd data={[
        { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How the AI 742 consulting process works', step: h.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })) },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: h.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
      ]} />
      <section className="page-hero">
        <div className="page-orb page-orb--purple" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Breadcrumbs items={[{ label: 'How It Works' }]} />
          <h1 className="h-1 fade" style={{ marginTop: 24, maxWidth: 1040, animationDelay: '.1s' }}>{h.heroTitle} <span className="grad">{h.heroAccent}</span> {h.heroTitleEnd}</h1>
          <p className="lead fade" style={{ marginTop: 26, animationDelay: '.2s' }}>{h.intro}</p>
        </div>
      </section>

      <section className="container process" aria-label="Process" style={{ maxWidth: 1100, paddingBottom: 90 }}>
        <div className="process-line" aria-hidden="true"><span /></div>
        <ol>
          {h.steps.map((s, i) => (
            <li key={s.title} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="process-num">{pad(i + 1)}</div>
              <div className="process-card card">
                <div className="process-main">
                  <h2 className="h-3" style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}>{s.title}</h2>
                  <p className="muted">{s.text}</p>
                  {s.duration && <div className="mono-small" style={{ marginTop: 18 }}>Typical duration · {s.duration}</div>}
                </div>
                {s.deliverables?.length > 0 && (
                  <div className="process-get">
                    <div className="mono-small" style={{ color: 'var(--purple-soft)', letterSpacing: '.16em' }}>What you get</div>
                    <ul>
                      {s.deliverables.map((d: { text: string }) => (
                        <li key={d.text}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{d.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section band-soft" aria-labelledby="why-h">
        <div className="container why2">
          <div className="reveal" style={{ flex: '1 1 340px' }}>
            <p className="eyebrow">Why AI 742</p>
            <h2 id="why-h" className="h-2" style={{ marginTop: 16 }}>{home.why.title} <span className="grad">{home.why.accent}</span></h2>
            <Link href="/about" className="more" style={{ marginTop: 12 }}>Meet AI 742<Arrow size={14} /></Link>
          </div>
          <div className="why2-grid">
            {home.why.items.map((w, i) => (
              <div key={w.title} className="why2-row reveal" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="mono-small" style={{ color: 'var(--purple-soft)' }}>{pad(i + 1)}</div>
                <h3>{w.title}</h3>
                <p className="muted">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pfaq-h">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 id="pfaq-h" className="h-2 center reveal" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>Questions about getting started</h2>
          <div className="faq-cards">
            {h.faqs.map((f, i) => (
              <div key={f.question} className="faq-card reveal" style={{ transitionDelay: `${i * 70}ms` }}><h3>{f.question}</h3><p className="muted">{f.answer}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to put AI to work in" accent="your business?" text="Step one is a free discovery call with an AI consultant." />
    </div>
  )
}
