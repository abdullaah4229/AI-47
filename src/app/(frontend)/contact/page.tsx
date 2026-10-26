import type { Metadata } from 'next'
import '../services.css'
import '../forms.css'

import { Breadcrumbs, JsonLd } from '@/components/ui'
import { ContactForm } from '@/components/forms/ContactForm'
import { getAllServices } from '@/lib/services'
import { getSiteData } from '@/lib/site'

export const revalidate = 60

const TITLE = 'Contact an AI Consultant Near You | Free Consultation'
const DESCRIPTION = 'Talk to an AI consultant about automating your business. Book a free consultation with AI 742 — serving small businesses across the United States.'

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: '/contact' }, openGraph: { title: `${TITLE} | AI 742`, description: DESCRIPTION, url: '/contact' } }

const STEPS = [
  ['We review your request', 'A real person reads every message.'],
  ['Free discovery call', 'We learn your goals and current workflows.'],
  ['Your tailored proposal', 'Clear scope, timeline estimate, and pricing.'],
]

export default async function ContactPage() {
  const [site, services] = await Promise.all([getSiteData(), getAllServices()])
  return (
    <div className="svc-page">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: TITLE, description: DESCRIPTION }} />
      <section className="page-hero contact-hero">
        <div className="page-orb" aria-hidden="true" />
        <div className="container contact-grid">
          <div className="contact-copy">
            <Breadcrumbs items={[{ label: 'Contact' }]} />
            <h1 className="h-1 fade" style={{ marginTop: 24, animationDelay: '.1s' }}>Talk to an <span className="grad">AI Consultant.</span></h1>
            <p className="lead fade" style={{ marginTop: 24, animationDelay: '.2s' }}>Let’s explore how intelligent automation can simplify your operations and accelerate your business growth.</p>
            <h2 className="mono-small fade" style={{ marginTop: 44, letterSpacing: '.16em', fontWeight: 500, animationDelay: '.3s' }}>What happens next</h2>
            <ol className="next-steps fade" style={{ animationDelay: '.35s' }}>
              {STEPS.map(([t, d], i) => (
                <li key={t}><span className="next-num">0{i + 1}</span><div><div style={{ fontWeight: 600 }}>{t}</div><div className="muted" style={{ fontSize: 15 }}>{d}</div></div></li>
              ))}
            </ol>
            <div className="contact-cards fade" style={{ animationDelay: '.4s' }}>
              {site.contactEmail && <a className="contact-card" href={`mailto:${site.contactEmail}`}><span className="mono-small">Email</span><span>{site.contactEmail}</span></a>}
              {site.phone && <a className="contact-card" href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><span className="mono-small">Phone</span><span>{site.phone}</span></a>}
              <div className="contact-card"><span className="mono-small">Serving</span><span>Businesses across the United States</span></div>
            </div>
          </div>
          <div className="contact-form-col fade" style={{ animationDelay: '.2s' }}>
            <ContactForm services={services.map((s) => s.title)} bookingUrl={site.bookingUrl} />
          </div>
        </div>
      </section>

      {site.bookingUrl && (
        <section className="container" aria-labelledby="book-h" style={{ paddingBottom: 110 }}>
          <div className="book reveal">
            <div>
              <p className="eyebrow">Prefer to pick a time?</p>
              <h2 id="book-h" className="h-2" style={{ marginTop: 14, fontSize: 'clamp(30px, 3.4vw, 44px)' }}>Schedule a Discovery Call</h2>
              <p className="muted" style={{ marginTop: 14 }}>Choose a time that suits you. The call is free and comes with no obligation.</p>
            </div>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic">Open the booking calendar</a>
          </div>
        </section>
      )}
    </div>
  )
}
