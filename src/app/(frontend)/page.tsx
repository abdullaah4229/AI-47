import type { Metadata } from 'next'
import Link from 'next/link'
import './home.css'

import { Arrow, Icon } from '@/components/Icon'
import { Hero } from '@/components/home/Hero'
import { WorkflowDemo } from '@/components/home/WorkflowDemo'
import { FaqAccordion } from '@/components/home/FaqAccordion'
import { getHomeData } from '@/lib/home'
import { getSiteData } from '@/lib/site'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData()
  return {
    title: { absolute: site.defaultTitle },
    description: site.defaultDescription,
    alternates: { canonical: '/' },
    openGraph: { title: site.defaultTitle, description: site.defaultDescription, url: '/' },
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const delay = (i: number, base = 0) => ({ transitionDelay: `${base + i * 80}ms` })
const pad = (n: number) => String(n).padStart(2, '0')

function Heading({ title, accent, id, className = 'h-2' }: { title: string; accent?: string; id: string; className?: string }) {
  return (
    <h2 id={id} className={className}>
      {title} {accent && <span className="grad">{accent}</span>}
    </h2>
  )
}

const MARQUEE = ['AI Automation', 'Chatbots', 'Voice Agents', 'AI Receptionists', 'Lead Generation', 'Content Creation', 'Dashboards', 'CRM Integration', 'Marketing Automation', 'AI Consulting']
const KPIS = [
  ['Tasks automated', '2,418'],
  ['Conversations handled', '1,096'],
  ['Qualified leads', '184'],
  ['Meetings booked', '57'],
]
const BARS = [42, 58, 51, 74, 66, 38, 29]
const AGENTS = [
  ['Website Chat Agent', 'Active', '#00E5FF', true],
  ['Voice Reception Agent', 'Active', '#00E5FF', true],
  ['Lead Follow-Up Flow', 'Running', '#A78BFA', true],
  ['Weekly Report Builder', 'Scheduled', '#71717A', false],
] as const

export default async function HomePage() {
  const [{ home, services, industries, faqs }, site] = await Promise.all([getHomeData(), getSiteData()])

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'AI 742',
      url: SITE_URL,
      description: site.defaultDescription,
      areaServed: { '@type': 'Country', name: 'United States' },
      ...(site.contactEmail ? { email: site.contactEmail } : {}),
      ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI services',
        itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.summary } })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    },
  ]

  return (
    <div className="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <Hero hero={home.hero} />

      {/* Marquee */}
      <div className="marquee" aria-label="Capabilities">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="marquee-item" aria-hidden={i >= MARQUEE.length}>
              <span className={i % 2 ? 'outline' : ''}>{t}</span>
              <span className="marquee-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Trust */}
      <section id="trust" className="section" aria-labelledby="trust-h">
        <div className="container">
          <div className="split-head reveal">
            <Heading id="trust-h" title={home.trust.title} accent={home.trust.accent} className="h-3 trust-title" />
            <p className="muted" style={{ maxWidth: 440, margin: 0 }}>{home.trust.intro}</p>
          </div>
          <div className="trust-grid">
            {home.trust.items.map((t, i) => (
              <div key={t.title} className="trust-cell reveal" style={delay(i)}>
                <Icon name={t.icon} size={26} color="#00E5FF" />
                <div className="trust-cell-title">{t.title}</div>
                <div className="muted" style={{ fontSize: 14 }}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section band" aria-labelledby="svc-h">
        <div className="container">
          <div className="reveal">
            <p className="eyebrow">01 — AI automation services</p>
            <div className="split-head" style={{ marginTop: 18 }}>
              <Heading id="svc-h" title={home.services.title} accent={home.services.accent} className="h-2 h-2-xl" />
              <div style={{ maxWidth: 420 }}>
                <p className="muted" style={{ margin: 0, fontSize: 17 }}>{home.services.intro}</p>
                <Link href="/services" className="more" style={{ fontSize: 15 }}>View all AI services<Arrow size={14} /></Link>
              </div>
            </div>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <div key={s.slug} className="reveal" style={delay(i % 3)}>
                <article className="card spot grad-border svc-card">
                  <div className="svc-top">
                    <div className="card-ico"><Icon name={s.icon} size={25} color="#67E8F9" draw /></div>
                    <span className="mono-small">{pad(i + 1)}</span>
                  </div>
                  <h3 className="h-3">{s.title}</h3>
                  <p className="muted svc-text">{s.summary}</p>
                  <Link href={`/services/${s.slug}`} className="more">Learn more<span className="sr-only"> about {s.title}</span><Arrow size={14} /></Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI receptionist promo */}
      <section className="container promo-wrap" aria-labelledby="rcp-h">
        <Link href="/services/ai-receptionist" className="promo spot reveal">
          <span className="promo-left">
            <span className="promo-ico" aria-hidden="true"><span className="ring-ping" /><Icon name="headset" size={26} color="#67E8F9" /></span>
            <span>
              <span className="mono-small" style={{ color: 'var(--cyan-soft)' }}>New service</span>
              <span id="rcp-h" className="promo-title">AI Receptionist for Small Business</span>
              <span className="muted promo-sub">A 24/7 AI answering service that never misses a call.</span>
            </span>
          </span>
          <span className="more" style={{ fontSize: 15 }}>See how it works<Arrow size={14} /></span>
        </Link>
      </section>

      {/* Workflow demo */}
      <section id="solutions" className="section" aria-labelledby="flow-h">
        <div className="container">
          <div className="reveal">
            <p className="eyebrow">02 — Live demo</p>
            <div className="split-head" style={{ marginTop: 18 }}>
              <h2 id="flow-h" className="h-2 h-2-xl">See <span className="grad">Intelligence</span> in Action.</h2>
              <span className="pill-dashed">Illustrative workflow</span>
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 56 }}><WorkflowDemo /></div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="section" aria-labelledby="why-h">
        <div className="container why">
          <div className="reveal why-head">
            <p className="eyebrow">03 — Why AI 742</p>
            <Heading id="why-h" title={home.why.title} accent={home.why.accent} className="h-2" />
            <p className="muted" style={{ maxWidth: 420, marginTop: 24 }}>{home.why.intro}</p>
            <Link href="/about" className="more" style={{ fontSize: 15 }}>Meet AI 742<Arrow size={14} /></Link>
          </div>
          <div className="why-grid">
            {home.why.items.map((w, i) => (
              <div key={w.title} className="reveal" style={delay(i % 2)}>
                <div className="why-row">
                  <div className="why-num">{pad(i + 1)}</div>
                  <h3>{w.title}</h3>
                  <p className="muted">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section band" aria-labelledby="how-h">
        <div className="container">
          <div className="reveal center">
            <p className="eyebrow">04 — How it works</p>
            <Heading id="how-h" title={home.steps.title} accent={home.steps.accent} className="h-2 narrow" />
            <Link href="/how-it-works" className="more" style={{ fontSize: 15, marginTop: 14 }}>See our full process<Arrow size={14} /></Link>
          </div>
          <div className="timeline reveal">
            <div className="timeline-line" aria-hidden="true" />
            <div className="timeline-dot" aria-hidden="true" />
            <ol>
              {home.steps.items.map((s, i) => (
                <li key={s.title}>
                  <div className="timeline-num" style={{ animationDelay: `${(0.15 + i * 1.12).toFixed(2)}s` }}>{pad(i + 1)}</div>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="section dash-section" aria-labelledby="dash-h">
        <div className="dash-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="reveal center">
            <p className="eyebrow">05 — Command center</p>
            <h2 id="dash-h" className="h-2">Complete Visibility.<br /><span className="grad">Intelligent Control.</span></h2>
            <p className="lead" style={{ margin: '20px auto 0' }}>Bring your business automation, customer interactions, and operational insights together in one intelligent workspace.</p>
          </div>
          <div className="reveal dash">
            <div className="dash-bar">
              <div className="dash-dots"><i /><i /><i /><span className="mono-small">ai742 / workspace / overview</span></div>
              <span className="pill-sample">Sample data · illustrative only</span>
            </div>
            <div className="dash-kpis">
              {KPIS.map(([label, value]) => (
                <div key={label} className="dash-panel spot">
                  <div className="muted" style={{ fontSize: 13 }}>{label}</div>
                  <div className="dash-value">{value}</div>
                  <div className="mono-small" style={{ color: 'var(--cyan-soft)' }}>Sample · this month</div>
                </div>
              ))}
            </div>
            <div className="dash-row">
              <div className="dash-panel spot dash-wide">
                <div className="dash-panel-head"><strong>Automation Overview</strong><span className="mono-small">Last 12 weeks · sample</span></div>
                <svg viewBox="0 0 600 200" role="img" aria-label="Sample line chart showing tasks automated rising over twelve weeks" style={{ width: '100%', height: 'auto', marginTop: 16 }}>
                  <defs>
                    <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00E5FF" stopOpacity=".35" /><stop offset="1" stopColor="#00E5FF" stopOpacity="0" /></linearGradient>
                    <linearGradient id="lineG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
                  </defs>
                  <g stroke="rgba(255,255,255,.06)">{[40, 90, 140, 190].map((y) => <line key={y} x1="0" y1={y} x2="600" y2={y} />)}</g>
                  <path className="chartarea" d="M0 170 L55 162 L110 158 L165 140 L220 146 L275 120 L330 112 L385 96 L440 100 L495 70 L550 58 L600 40 L600 200 L0 200 Z" fill="url(#areaG)" />
                  <path className="chartline" pathLength={1} d="M0 170 L55 162 L110 158 L165 140 L220 146 L275 120 L330 112 L385 96 L440 100 L495 70 L550 58 L600 40" fill="none" stroke="url(#lineG)" strokeWidth="2.5" />
                  <circle cx="600" cy="40" r="5" fill="#00E5FF" className="blink" />
                </svg>
              </div>
              <div className="dash-panel spot">
                <div className="dash-panel-head"><strong>Leads by Day</strong><span className="mono-small">Sample</span></div>
                <div className="bars" role="img" aria-label="Sample bar chart of leads per weekday">
                  {BARS.map((v, i) => (
                    <div key={i} className="bar-col">
                      <div className={`bar${i === 3 ? ' bar--hi' : ''}`} style={{ height: `${v}%`, transitionDelay: `${300 + i * 90}ms` }} />
                      <span className="mono-small">{'MTWTFSS'[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dash-panel spot">
                <strong>AI Agent Activity</strong>
                <ul className="agents">
                  {AGENTS.map(([name, status, color, live]) => (
                    <li key={name}>
                      <span><i className={live ? 'blink' : ''} style={{ background: color, boxShadow: `0 0 10px ${color}` }} />{name}</span>
                      <span className="mono-small">{status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section" aria-labelledby="ind-h">
        <div className="container">
          <div className="split-head reveal">
            <div>
              <p className="eyebrow">06 — Industries</p>
              <h2 id="ind-h" className="h-2" style={{ marginTop: 18, maxWidth: 820 }}>AI Solutions for Every <span className="grad">Ambitious Business.</span></h2>
            </div>
            <Link href="/industries" className="more" style={{ fontSize: 15 }}>Explore all industries<Arrow size={14} /></Link>
          </div>
          <div className="ind-grid">
            {industries.map((ind, i) => (
              <div key={ind.slug} className="reveal" style={delay(i % 5)}>
                <article className="card spot ind-card">
                  <div className="card-ico card-ico--purple"><Icon name={ind.icon} size={24} color="#A78BFA" draw /></div>
                  <h3>{ind.name}</h3>
                  {ind.opportunities && <div className="ind-opps">{ind.opportunities}</div>}
                  <p className="muted">{ind.summary}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" aria-labelledby="ben-h">
        <div className="container reveal">
          <div className="benefits spot">
            <Heading id="ben-h" title={home.benefits.title} accent={home.benefits.accent} className="h-2" />
            <div className="benefits-grid">
              {home.benefits.items.map((b, i) => (
                <div key={b.title} className="reveal" style={delay(i, 150)}>
                  <div className="bline" />
                  <h3>{b.title}</h3>
                  <p className="muted">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section" aria-labelledby="about-h">
        <div className="container about">
          <div className="reveal about-copy">
            <p className="eyebrow">07 — About</p>
            <Heading id="about-h" title={home.about.title} accent={home.about.accent} className="h-2" />
            {home.about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'about-lead' : 'muted'}>{p.text}</p>
            ))}
            <Link href="/about" className="more" style={{ fontSize: 15 }}>More about AI 742<Arrow size={14} /></Link>
          </div>
          <div className="reveal about-visual" aria-hidden="true">
            <div className="spot about-box">
              <svg viewBox="0 0 400 400">
                <defs><linearGradient id="ringA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2563EB" /><stop offset=".5" stopColor="#00E5FF" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
                <g stroke="rgba(0,229,255,.28)">
                  {[[80, 90], [320, 80], [340, 250], [250, 340], [70, 290]].map(([x, y]) => <line key={`${x}${y}`} x1="200" y1="200" x2={x} y2={y} />)}
                  <path d="M80 90 L320 80 L340 250 L250 340 L70 290 Z" fill="none" />
                </g>
                <g stroke="url(#ringA)" strokeWidth="1.6" strokeDasharray="4 10" fill="none" className="dash"><path d="M80 90 L200 200 L340 250" /><path d="M70 290 L200 200 L320 80" /><path d="M250 340 L200 200" /></g>
                <g fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fill="#A1A1AA" textAnchor="middle">
                  {([[80, 90, 'CRM', '#2563EB'], [320, 80, 'EMAIL', '#00E5FF'], [340, 250, 'CALENDAR', '#8B5CF6'], [250, 340, 'CHAT', '#00E5FF'], [70, 290, 'ANALYTICS', '#2563EB']] as const).map(([x, y, t, c]) => (
                    <g key={t}><circle cx={x} cy={y} r="18" fill="#101827" stroke={c} /><text x={x} y={y + 38}>{t}</text></g>
                  ))}
                </g>
                <circle cx="200" cy="200" r="58" fill="none" stroke="rgba(0,229,255,.3)" className="ring-ping-svg" />
                <circle cx="200" cy="200" r="44" fill="#050505" stroke="#00E5FF" strokeWidth="1.5" className="pulse-c2" />
                <text x="200" y="207" textAnchor="middle" fontFamily="Space Grotesk Variable, sans-serif" fontWeight="700" fontSize="20" fill="#fff">AI 742</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-h">
        <div className="container faq-wrap">
          <div className="reveal center">
            <p className="eyebrow">08 — FAQ</p>
            <h2 id="faq-h" className="h-2" style={{ marginTop: 18 }}>Frequently Asked Questions</h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Contact teaser */}
      <section id="contact" className="section" aria-labelledby="contact-h">
        <div className="container reveal">
          <div className="contact-teaser grad-border spot">
            <div>
              <p className="eyebrow">09 — Contact</p>
              <h2 id="contact-h" className="h-2" style={{ marginTop: 18 }}>Ready to Transform Your Business with <span className="grad">AI?</span></h2>
              <p className="lead" style={{ marginTop: 20 }}>Let’s explore how intelligent automation can simplify your operations and accelerate your business growth.</p>
            </div>
            <div className="contact-actions">
              <Link href="/contact" className="btn btn-primary magnetic">Request Free Consultation<Arrow size={18} /></Link>
              {site.bookingUrl ? (
                <a href={site.bookingUrl} className="btn btn-ghost magnetic" target="_blank" rel="noopener noreferrer">Schedule a Discovery Call</a>
              ) : (
                <Link href="/contact" className="btn btn-ghost magnetic">Schedule a Discovery Call</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final" aria-labelledby="cta-h">
        <div className="container reveal">
          <div className="final-frame">
            <div className="final-beam" aria-hidden="true" />
            <div className="final-inner">
              <div className="gridbg" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
              <div className="sparks" aria-hidden="true">
                {Array.from({ length: 14 }, (_, i) => (
                  <span key={i} className={i % 2 ? 'spark-c' : 'spark-p'} style={{ left: `${((i * 7.3 + 3) % 100).toFixed(1)}%`, width: 2 + (i % 3), height: 2 + (i % 3), animationDuration: `${(6 + (i % 5) * 1.3).toFixed(1)}s`, animationDelay: `${(-(i * 0.9)).toFixed(1)}s` }} />
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <h2 id="cta-h" className="final-title">{home.finalCta.title} <span className="grad glowtext">{home.finalCta.accent}</span></h2>
                <p className="final-text">{home.finalCta.text}</p>
                <Link href={home.finalCta.buttonHref} className="btn btn-light magnetic final-btn">{home.finalCta.buttonLabel}<Arrow size={18} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
