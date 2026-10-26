import type { Metadata } from 'next'
import '../services.css'
import '../pages.css'

import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { IndustryExplorer } from '@/components/industries/IndustryExplorer'
import { getIndustries } from '@/lib/pages'

export const revalidate = 60

const TITLE = 'AI Solutions by Industry | AI for Law Firms, Real Estate & More'
const DESCRIPTION = 'See how AI automation helps law firms, real estate agents, healthcare administration, e-commerce, professional services, and other US small businesses.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/industries' },
  openGraph: { title: `${TITLE} | AI 742`, description: DESCRIPTION, url: '/industries' },
}

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function IndustriesPage() {
  const industries = await getIndustries()
  return (
    <div className="svc-page">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Industries', itemListElement: industries.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: `AI for ${i.name}`, url: `${SITE_URL}/industries/${i.slug}` })) }} />
      <section className="page-hero">
        <div className="page-orb page-orb--purple" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Breadcrumbs items={[{ label: 'Industries' }]} />
          <h1 className="h-1 fade" style={{ marginTop: 24, animationDelay: '.1s' }}>AI Solutions <span className="grad">by Industry.</span></h1>
          <p className="lead fade" style={{ marginTop: 26, animationDelay: '.2s' }}>Choose your industry to see where intelligent automation typically makes the biggest difference.</p>
        </div>
      </section>
      <section className="container reveal" aria-label="Industry explorer" style={{ paddingBottom: 110 }}>
        <IndustryExplorer industries={industries} />
      </section>
      <CtaBand title="Don’t see your industry?" accent="Let’s talk." text="Most businesses share the same time drains — calls, follow-ups, scheduling, and admin. A free consultation will show you where AI fits yours." />
    </div>
  )
}
