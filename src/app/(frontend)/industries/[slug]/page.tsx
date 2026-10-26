import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../services.css'
import '../../pages.css'

import { Arrow, Icon } from '@/components/Icon'
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { getIndustries, getIndustry } from '@/lib/pages'

export const revalidate = 60
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getIndustries()).map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = await getIndustry((await params).slug)
  if (!ind) notFound()
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: { title: `${ind.metaTitle} | AI 742`, description: ind.metaDescription, url: `/industries/${ind.slug}` },
  }
}

export default async function IndustryDetail({ params }: Props) {
  const ind = await getIndustry((await params).slug)
  if (!ind) notFound()
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="svc-page">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: ind.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }} />
      <section className="page-hero">
        <div className="page-orb" aria-hidden="true" />
        <div className="container hero-split">
          <div className="hero-split-copy">
            <Breadcrumbs items={[{ label: 'Industries', href: '/industries' }, { label: ind.name }]} />
            <h1 className="h-1 fade" style={{ marginTop: 24, animationDelay: '.1s' }}>{ind.heroTitle} <span className="grad">{ind.heroAccent}</span></h1>
            <p className="lead fade" style={{ marginTop: 26, animationDelay: '.2s' }}>{ind.intro}</p>
            <div className="row-actions fade" style={{ animationDelay: '.3s' }}>
              <Link href="/contact" className="btn btn-primary magnetic">Book Free Consultation<Arrow size={18} /></Link>
              <Link href="/ai-readiness-assessment" className="more">Take the free AI readiness assessment<Arrow size={14} /></Link>
            </div>
          </div>
          <div className="hero-split-visual fade" style={{ animationDelay: '.35s' }} aria-hidden="true">
            <div className="ind-badge">
              <span className="ind-badge-ring" />
              <span className="ind-badge-ring ind-badge-ring--2" />
              <Icon name={ind.icon} size={72} color="#A78BFA" strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="uc-h" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="reveal"><p className="eyebrow">Use cases</p><h2 id="uc-h" className="h-2" style={{ marginTop: 16 }}>Where AI helps <span className="grad">most.</span></h2></div>
          <div className="uses-grid">
            {ind.useCases.map((u, i) => (
              <div key={u.title} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <article className="card spot grad-border use-card">
                  <span className="mono-small" style={{ color: 'var(--purple-soft)' }}>{pad(i + 1)}</span>
                  <h3 className="h-3">{u.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>{u.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {ind.flow.length > 0 && (
        <section className="section band-soft" aria-labelledby="ex-h">
          <div className="container">
            <div className="reveal"><p className="eyebrow">Example workflow · illustrative</p><h2 id="ex-h" className="h-2" style={{ marginTop: 16 }}>From first contact to <span className="grad">booked appointment.</span></h2></div>
            <ol className="mini-flow mini-flow--lg reveal">
              {ind.flow.map((f, i) => (
                <li key={f}>
                  <div className="mini-step"><span className="mono-small" style={{ color: '#c4b5fd' }}>Step {pad(i + 1)}</span><span>{f}</span></div>
                  {i < ind.flow.length - 1 && <span className="mini-arrow" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            {ind.note && <p className="notice reveal" role="note">{ind.note}</p>}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="ifaq-h">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 id="ifaq-h" className="h-2 center reveal" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>Common questions</h2>
          <div className="faq-cards">
            {ind.faqs.map((f, i) => (
              <div key={f.question} className="faq-card reveal" style={{ transitionDelay: `${i * 70}ms` }}><h3>{f.question}</h3><p className="muted">{f.answer}</p></div>
            ))}
          </div>
        </div>
      </section>

      {ind.related.length > 0 && (
        <section className="container" aria-labelledby="rel-h" style={{ paddingBottom: 100 }}>
          <h2 id="rel-h" className="h-3 reveal" style={{ fontSize: 28 }}>Related services</h2>
          <div className="rel-grid">
            {ind.related.map((r, i) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="card spot rel-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="rel-name"><Icon name={r.icon} size={24} color="#67E8F9" />{r.title}</span>
                <Arrow size={18} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBand title={`Put AI to work for your`} accent={`${ind.name.toLowerCase()} business.`} text="Book a free consultation and we’ll show you the first automations worth building." />
    </div>
  )
}
