import type { Metadata } from 'next'
import Link from 'next/link'
import '../services.css'

import { Arrow, Icon } from '@/components/Icon'
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { getAllServices } from '@/lib/services'

export const revalidate = 60

const TITLE = 'AI Consulting & Automation Services for Small Businesses'
const DESCRIPTION =
  'AI consulting and automation services for small businesses in the US: AI receptionists, chatbots, voice agents, lead generation, workflow automation, and custom AI solutions.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: { title: `${TITLE} | AI 742`, description: DESCRIPTION, url: '/services' },
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <div className="svc-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: TITLE,
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/services/${s.slug}`, name: s.title })),
        }}
      />

      <section className="page-hero">
        <div className="page-orb" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <h1 className="h-1 fade" style={{ marginTop: 24, maxWidth: 1040, animationDelay: '.1s' }}>
            AI Consulting &amp; Automation Services for <span className="grad">Small Businesses</span>
          </h1>
          <p className="lead fade" style={{ marginTop: 26, animationDelay: '.2s' }}>
            From AI strategy to chatbots, voice agents, and end-to-end workflow automation — practical AI services built for growing US businesses.
          </p>
        </div>
      </section>

      <section className="container" aria-label="All services" style={{ paddingBottom: 100 }}>
        <div className="all-svc-grid">
          {services.map((s, i) => (
            <div key={s.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <Link href={`/services/${s.slug}`} className="card spot all-svc-card">
                <span className="all-svc-top">
                  <span className="card-ico"><Icon name={s.icon} size={24} color="#67E8F9" draw /></span>
                  <span className="mono-small">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h2 className="h-3">{s.title}</h2>
                <p className="muted" style={{ margin: 0, flexGrow: 1 }}>{s.summary}</p>
                <span className="all-svc-foot">
                  <span className="mono-small" style={{ color: 'var(--faint)' }}>/services/{s.slug}</span>
                  <span className="more" style={{ minHeight: 'auto' }}>Explore<Arrow size={14} /></span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container" aria-labelledby="start-h" style={{ paddingBottom: 100 }}>
        <div className="start-row">
          <div className="start-main spot reveal">
            <div style={{ position: 'relative', zIndex: 3 }}>
              <p className="eyebrow">Not sure where to start?</p>
              <h2 id="start-h" className="h-2 start-title">Start with an AI consulting session.</h2>
              <p className="muted" style={{ maxWidth: 560 }}>We map your workflows, find the highest-impact opportunities, and recommend which services make sense — and which don’t.</p>
              <div className="row-actions">
                <Link href="/contact" className="btn btn-primary magnetic">Book Free Consultation</Link>
                <Link href="/ai-readiness-assessment" className="more">Take the free AI readiness assessment<Arrow size={14} /></Link>
              </div>
            </div>
          </div>
          <div className="start-side reveal" style={{ transitionDelay: '100ms' }}>
            <p className="eyebrow" style={{ color: 'var(--purple-soft)' }}>By industry</p>
            <p style={{ color: '#d4d4d8' }}>See how these services apply to law firms, real estate, healthcare administration, professional services, and more.</p>
            <Link href="/industries" className="more">Explore industries<Arrow size={14} /></Link>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to put AI to work in" accent="your business?" text="Book a free consultation with an AI consultant and leave with clear, practical next steps." />
    </div>
  )
}
