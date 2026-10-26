import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../services.css'

import { Arrow, Icon } from '@/components/Icon'
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { SampleCall } from '@/components/services/SampleCall'
import { getAllServices, getServicePage } from '@/lib/services'

export const revalidate = 60
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const all = await getAllServices()
  return all.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = await getServicePage(slug)
  if (!s) notFound()
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.metaTitle} | AI 742`, description: s.metaDescription, url: `/services/${s.slug}` },
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const COMPARE = [
  ['Answers calls 24/7', 'Yes', 'Depends on plan', 'Records only'],
  ['Books appointments in your calendar', 'Yes', 'Often', 'No'],
  ['Handles several calls at once', 'Yes', 'Depends on staffing', 'No'],
  ['Answers from your approved information', 'Yes', 'Yes, with scripts', 'No'],
  ['Hands off to a person', 'Yes, with a summary', 'Yes', 'No'],
]
const WHO = [
  ['Law Firms', '/industries/law-firms', 'After-hours intake and consultation booking'],
  ['Real Estate', '/industries/real-estate', 'Property questions and showing requests'],
  ['Healthcare Administration', '/industries', 'Appointment scheduling and reminders (nonclinical)'],
  ['Home Services', '/industries', 'Service calls, quotes, and emergencies'],
]

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [s, all] = await Promise.all([getServicePage(slug), getAllServices()])
  if (!s) notFound()
  const receptionist = s.template === 'receptionist'

  return (
    <div className="svc-page">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.title,
            serviceType: s.title,
            description: s.metaDescription,
            url: `${SITE_URL}/services/${s.slug}`,
            areaServed: { '@type': 'Country', name: 'United States' },
            provider: { '@type': 'ProfessionalService', name: 'AI 742', url: SITE_URL },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
          },
        ]}
      />

      {/* sub-navigation: every service is its own page */}
      <nav aria-label="All services" className="container svc-subnav">
        {all.map((o) => (
          <Link key={o.slug} href={`/services/${o.slug}`} className={`svc-tab${o.slug === s.slug ? ' is-current' : ''}`} aria-current={o.slug === s.slug ? 'page' : undefined}>
            {o.title}
          </Link>
        ))}
      </nav>

      <section className="page-hero page-hero--split">
        <div className="page-orb" aria-hidden="true" />
        <div className="container hero-split">
          <div className="hero-split-copy">
            <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: s.title }]} />
            <h1 className="h-1 fade" style={{ marginTop: 24, animationDelay: '.1s' }}>
              {s.heroTitle} {s.heroAccent && <span className="grad">{s.heroAccent}</span>}
            </h1>
            <p className="lead fade" style={{ marginTop: 26, animationDelay: '.2s' }}>{s.intro}</p>
            <div className="row-actions fade" style={{ animationDelay: '.3s' }}>
              <Link href="/contact" className="btn btn-primary magnetic">{receptionist ? 'Get Your AI Receptionist' : 'Book Your Free AI Consultation'}<Arrow size={18} /></Link>
              <a href={receptionist ? '#compare' : '#uses'} className="more">{receptionist ? 'Compare with a virtual receptionist' : 'See what it can do'}<Arrow size={14} /></a>
            </div>
          </div>
          <div className="hero-split-visual fade" style={{ animationDelay: '.35s' }}>
            {receptionist ? (
              <SampleCall />
            ) : (
              <div className="orbit" aria-hidden="true">
                <svg viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="svG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
                    <radialGradient id="svC"><stop offset="0" stopColor="#00E5FF" stopOpacity=".5" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" /></radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="150" fill="url(#svC)" className="orbit-pulse" />
                  <g className="orbit-spin"><circle cx="200" cy="200" r="170" fill="none" stroke="url(#svG)" strokeDasharray="2 9" /><circle cx="200" cy="30" r="6" fill="#00E5FF" /><circle cx="353" cy="275" r="5" fill="#8B5CF6" /><circle cx="47" cy="275" r="5" fill="#2563EB" /></g>
                  <g className="orbit-spin-rev"><circle cx="200" cy="200" r="118" fill="none" stroke="rgba(0,229,255,.35)" strokeDasharray="50 12 4 12" /></g>
                  <rect x="132" y="132" width="136" height="136" rx="36" fill="#0C1322" stroke="url(#svG)" strokeWidth="2" />
                </svg>
                <span className="orbit-icon"><Icon name={s.icon} size={64} color="#67E8F9" strokeWidth={1.3} /></span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="uses" className="section" aria-labelledby="uses-h" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="reveal">
            <p className="eyebrow">{receptionist ? 'AI answering service' : 'What we automate'}</p>
            <h2 id="uses-h" className="h-2" style={{ marginTop: 16, maxWidth: 820 }}>{s.usesHeadline}</h2>
          </div>
          <div className="uses-grid">
            {s.useCases.map((u, i) => (
              <div key={u.title} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <article className="card spot grad-border use-card">
                  <span className="mono-small" style={{ color: 'var(--purple-soft)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h-3">{u.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>{u.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {receptionist && (
        <section id="compare" className="section band-soft" aria-labelledby="cmp-h">
          <div className="container" style={{ maxWidth: 1100 }}>
            <div className="reveal center">
              <p className="eyebrow">Compare</p>
              <h2 id="cmp-h" className="h-2" style={{ marginTop: 16 }}>AI receptionist vs. <span className="grad">virtual receptionist.</span></h2>
            </div>
            <div className="table-wrap reveal">
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col" className="is-hi">AI receptionist</th>
                    <th scope="col">Virtual receptionist</th>
                    <th scope="col">Voicemail</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([cap, ...vals]) => (
                    <tr key={cap}>
                      <th scope="row">{cap}</th>
                      {vals.map((v, i) => <td key={i} className={v.startsWith('Yes') ? 'yes' : ''}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mono-small center" style={{ marginTop: 14 }}>General comparison. Capabilities vary by provider and plan.</p>
          </div>
        </section>
      )}

      <section className="section band-soft" aria-labelledby="inc-h">
        <div className="container deliver">
          <div className="reveal deliver-steps">
            <p className="eyebrow">How we deliver</p>
            <h2 className="h-2" style={{ marginTop: 16, fontSize: 'clamp(30px, 3.4vw, 44px)' }}>From idea to <span className="grad">running system.</span></h2>
            <ol className="vsteps">
              {s.process.map((p, i) => (
                <li key={p.title}>
                  <span className="vstep-num">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{p.title}</h3><p className="muted">{p.text}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="more">See our full process<Arrow size={14} /></Link>
          </div>
          <div className="reveal included spot" style={{ transitionDelay: '100ms' }}>
            <div style={{ position: 'relative', zIndex: 3 }}>
              <h2 id="inc-h" className="h-3" style={{ fontSize: 28 }}>What’s included</h2>
              <ul>
                {s.included.map((t) => (
                  <li key={t}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t}</li>
                ))}
              </ul>
              <p className="muted included-note">Pricing is scoped to your project. You receive a clear proposal after a free consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {receptionist && (
        <section className="section" aria-labelledby="who-h" style={{ paddingBottom: 40 }}>
          <div className="container">
            <div className="reveal"><p className="eyebrow">Who it’s for</p><h2 id="who-h" className="h-2" style={{ marginTop: 16 }}>Built for businesses that <span className="grad">live on the phone.</span></h2></div>
            <div className="who-grid">
              {WHO.map(([t, h, d], i) => (
                <Link key={t} href={h} className="card spot who-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="who-title">{t}</span>
                  <span className="muted" style={{ fontSize: 14 }}>{d}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="sfaq-h">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 id="sfaq-h" className="h-2 center reveal" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>Questions about {s.title}</h2>
          <div className="faq-cards">
            {s.faqs.map((f, i) => (
              <div key={f.question} className="faq-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <h3>{f.question}</h3>
                <p className="muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="rel-h" style={{ paddingBottom: 100 }}>
        <h2 id="rel-h" className="h-3 reveal" style={{ fontSize: 28 }}>Pairs well with</h2>
        <div className="rel-grid">
          {s.related.map((r, i) => (
            <Link key={r.slug} href={`/services/${r.slug}`} className="card spot rel-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="rel-name"><Icon name={r.icon} size={24} color="#67E8F9" />{r.title}</span>
              <Arrow size={18} />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title={receptionist ? 'Never miss another' : 'Let’s map your first'}
        accent={receptionist ? 'call.' : 'AI project.'}
        text="A free consultation to find where this service would make the biggest difference in your business."
      />
    </div>
  )
}
