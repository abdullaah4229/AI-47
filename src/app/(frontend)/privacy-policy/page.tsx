import type { Metadata } from 'next'
import '../services.css'
import '../blog.css'
import '../pages.css'
import '../forms.css'
import { getLegal, LegalPage, PRIVACY_TEMPLATE } from '../LegalPage'

export const revalidate = 60
export const metadata: Metadata = { title: 'Privacy Policy', description: 'How AI 742 collects, uses, and protects your information.', alternates: { canonical: '/privacy-policy' } }

export default async function PrivacyPage() {
  const l = await getLegal()
  return <LegalPage title="Privacy Policy" crumb="Privacy Policy" content={l.privacy} template={PRIVACY_TEMPLATE} reviewed={l.reviewed} lastUpdated={l.lastUpdated} />
}
