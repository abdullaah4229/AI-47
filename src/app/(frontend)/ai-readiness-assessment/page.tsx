import type { Metadata } from 'next'
import '../services.css'
import '../forms.css'

import { Breadcrumbs, JsonLd } from '@/components/ui'
import { Assessment } from '@/components/forms/Assessment'

const TITLE = 'Free AI Readiness Assessment for Small Businesses'
const DESCRIPTION = 'Take the free AI readiness assessment: six quick questions that show how ready your business is for AI and where automation can help first.'

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: '/ai-readiness-assessment' }, openGraph: { title: `${TITLE} | AI 742`, description: DESCRIPTION, url: '/ai-readiness-assessment' } }

const FAQ = [
  ['What does the AI readiness assessment measure?', 'How much repetitive work your business has, how you handle calls and leads, and how ready your tools and team are to adopt AI.'],
  ['Is it really free?', 'Yes. There’s no sign-up required to see your result. Add your email only if you want a personal follow-up.'],
  ['What happens after I get my result?', 'You can book a free consultation to talk through your result with an AI consultant and get practical next steps.'],
]

export default function AssessmentPage() {
  return (
    <div className="svc-page">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
      <section className="page-hero assess-hero">
        <div className="assess-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', maxWidth: 900 }}>
          <div className="center" style={{ display: 'flex', justifyContent: 'center' }}><Breadcrumbs items={[{ label: 'AI Readiness Assessment' }]} /></div>
          <h1 className="h-1 fade center" style={{ marginTop: 22, animationDelay: '.1s' }}>Free AI Readiness <span className="grad">Assessment.</span></h1>
          <p className="lead fade center" style={{ margin: '20px auto 0', animationDelay: '.2s' }}>Six quick questions. Find out how ready your business is for AI — and where it can help first.</p>
          <div className="fade" style={{ marginTop: 44, animationDelay: '.3s' }}><Assessment /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="afaq-h" style={{ paddingTop: 20 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 id="afaq-h" className="h-2 center reveal" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>About this assessment</h2>
          <div className="faq-cards">
            {FAQ.map(([q, a], i) => <div key={q} className="faq-card reveal" style={{ transitionDelay: `${i * 70}ms` }}><h3>{q}</h3><p className="muted">{a}</p></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}
