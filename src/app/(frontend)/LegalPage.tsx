import config from '@payload-config'
import { getPayload } from 'payload'
import { Breadcrumbs } from '@/components/ui'
import { PostBody } from '@/components/blog/PostBody'
import { formatDate } from '@/lib/blog'

type Section = [id: string, title: string, text: string]

export const PRIVACY_TEMPLATE: Section[] = [
  ['collect', 'Information we collect', 'Describe the information collected through the contact form, the AI readiness assessment, newsletter sign-up, and any analytics — for example name, business email, company, phone number, and message.'],
  ['use', 'How we use information', 'Explain the purposes — responding to inquiries, scheduling consultations, sending requested updates, and improving the website.'],
  ['chat', 'AI chat assistant', 'If an AI assistant is added to the website, explain what conversation data is stored, for how long, and which providers process it.'],
  ['cookies', 'Cookies & analytics', 'List any cookies and analytics tools in use and how visitors can manage their preferences. This website does not currently use advertising or tracking cookies.'],
  ['sharing', 'Sharing & service providers', 'Describe service providers that process data on your behalf (hosting, email, scheduling) and state that personal information is not sold, if accurate.'],
  ['retention', 'Data retention & security', 'State how long information is kept and the general safeguards used, without absolute guarantees.'],
  ['rights', 'Your privacy rights', 'Describe rights available to visitors, including rights under applicable US state privacy laws, and how to submit a request.'],
  ['contact', 'Contact us', 'Business name, email address, and mailing address for privacy questions.'],
]
export const TERMS_TEMPLATE: Section[] = [
  ['acceptance', 'Acceptance of terms', 'State that using the website means agreeing to these terms.'],
  ['services', 'Our services', 'Explain that website content is general information and that client engagements are governed by a separate written agreement.'],
  ['ai', 'AI-generated content', 'Explain that AI tools and outputs may contain errors and do not constitute professional, legal, financial, or medical advice.'],
  ['ip', 'Intellectual property', 'Describe ownership of website content, branding, and blog articles.'],
  ['use', 'Acceptable use', 'List prohibited uses of the website and its forms.'],
  ['liability', 'Disclaimers & limitation of liability', 'Standard disclaimers and limitation of liability, drafted by counsel.'],
  ['law', 'Governing law', 'State and venue — for example, the laws of [STATE], USA.'],
  ['changes', 'Changes & contact', 'How updates to these terms are communicated, and contact details.'],
]

export async function getLegal() {
  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({ slug: 'legal', depth: 1 })) as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  } catch {
    return {} as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export function LegalPage({ title, crumb, content, template, reviewed, lastUpdated }: { title: string; crumb: string; content?: any; template: Section[]; reviewed?: boolean; lastUpdated?: string }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const hasContent = Boolean(content?.root?.children?.length)
  return (
    <div className="svc-page">
      <section className="container legal-head">
        <Breadcrumbs items={[{ label: crumb }]} />
        <h1 className="h-1" style={{ marginTop: 22, fontSize: 'clamp(40px, 5vw, 68px)' }}>{title}</h1>
        {lastUpdated && <p className="muted" style={{ marginTop: 14 }}>Last updated: {formatDate(lastUpdated)}</p>}
        {!reviewed && (
          <p className="notice" role="note"><strong>Template — requires legal review.</strong> This content is a starting structure and must be reviewed and completed by a qualified attorney.</p>
        )}
      </section>
      <section className="container legal-body">
        {hasContent ? (
          <div className="post-main" style={{ margin: '0 auto' }}><PostBody data={content} /></div>
        ) : (
          <div className="legal-layout">
            <aside className="toc" aria-label="On this page">
              <div className="mono-small" style={{ letterSpacing: '.14em', marginBottom: 14 }}>On this page</div>
              {template.map(([id, t]) => <a key={id} href={`#${id}`} className="toc-link">{t}</a>)}
            </aside>
            <div className="prose post-main">
              {template.map(([id, t, text]) => (
                <section key={id} id={id}><h2 id={`${id}-h`}>{t}</h2><p>[{text}]</p></section>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
