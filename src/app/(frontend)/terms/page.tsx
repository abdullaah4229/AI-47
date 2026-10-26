import type { Metadata } from 'next'
import '../services.css'
import '../blog.css'
import '../pages.css'
import '../forms.css'
import { getLegal, LegalPage, TERMS_TEMPLATE } from '../LegalPage'

export const revalidate = 60
export const metadata: Metadata = { title: 'Terms of Service', description: 'The terms that apply to using the AI 742 website.', alternates: { canonical: '/terms' } }

export default async function TermsPage() {
  const l = await getLegal()
  return <LegalPage title="Terms of Service" crumb="Terms of Service" content={l.terms} template={TERMS_TEMPLATE} reviewed={l.reviewed} lastUpdated={l.lastUpdated} />
}
