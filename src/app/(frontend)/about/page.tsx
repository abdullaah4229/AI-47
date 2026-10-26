import type { Metadata } from 'next'
import Image from 'next/image'
import '../services.css'
import '../pages.css'

import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { getAbout } from '@/lib/pages'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const a = await getAbout()
  return { title: { absolute: a.metaTitle }, description: a.metaDescription, alternates: { canonical: '/about' }, openGraph: { title: a.metaTitle, description: a.metaDescription, url: '/about' } }
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function AboutPage() {
  const a = await getAbout()
  const photo = a.founderPhoto && typeof a.founderPhoto === 'object' ? a.founderPhoto : null
  const showStory = Boolean(a.story || a.founderName)
  return (
    <div className="svc-page">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: a.metaTitle, url: `${SITE_URL}/about`, mainEntity: { '@type': 'Organization', name: 'AI 742', url: SITE_URL, ...(a.founderName ? { founder: { '@type': 'Person', name: a.founderName } } : {}) } }} />
      <section className="page-hero about-hero">
        <div className="about-glow" aria-hidden="true" />
        <div className="container center" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Breadcrumbs items={[{ label: 'About' }]} /></div>
          <h1 className="h-1 fade" style={{ marginTop: 26, maxWidth: 1100, marginInline: 'auto', animationDelay: '.1s' }}>{a.heroTitle} <span className="grad">{a.heroAccent}</span></h1>
          <p className="lead fade" style={{ margin: '30px auto 0', maxWidth: 760, animationDelay: '.2s' }}>{a.intro}</p>
        </div>
      </section>

      <section className="container mv" aria-label="Mission and vision">
        <div className="mv-card mv-card--cyan reveal"><div className="eyebrow">Mission</div><p>{a.mission}</p></div>
        <div className="mv-card mv-card--purple reveal" style={{ transitionDelay: '100ms' }}><div className="eyebrow" style={{ color: 'var(--purple-soft)' }}>Vision</div><p>{a.vision}</p></div>
      </section>

      <section className="section band-soft" aria-labelledby="bel-h">
        <div className="container">
          <div className="split-head2 reveal"><h2 id="bel-h" className="h-2">What we <span className="grad">believe.</span></h2><p className="muted" style={{ margin: 0 }}>The principles behind every solution we design.</p></div>
          <div className="beliefs">
            {a.beliefs.map((b, i) => (
              <div key={b.title} className="belief reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="mono-small" style={{ color: 'var(--cyan-soft)' }}>{String(i + 1).padStart(2, '0')}</div>
                <h3>{b.title}</h3>
                <p className="muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="story-h">
        <div className="container story">
          {showStory && (
            <div className="story-photo reveal">
              {photo?.url ? (
                <Image src={photo.url} alt={photo.alt || a.founderName || 'Founder of AI 742'} fill sizes="(max-width: 900px) 100vw, 520px" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="story-photo-empty" aria-hidden="true"><span>AI 742</span></div>
              )}
            </div>
          )}
          <div className="story-copy reveal" style={{ transitionDelay: '100ms', maxWidth: showStory ? undefined : 820 }}>
            <p className="eyebrow">Our story</p>
            <h2 id="story-h" className="h-2" style={{ marginTop: 16 }}>{a.storyTitle}</h2>
            {a.story && <p className="story-lead">{a.story}</p>}
            <p className="muted" style={{ lineHeight: 1.75 }}>{a.storyMore}</p>
            {a.founderName && (
              <div className="story-founder"><div className="h-3">{a.founderName}</div><div style={{ color: 'var(--cyan-soft)', fontSize: 14 }}>{a.founderRole}</div></div>
            )}
          </div>
        </div>
      </section>

      <CtaBand title="Let’s build something" accent="intelligent." text="Book a free consultation and see what AI can do for your business." />
    </div>
  )
}
