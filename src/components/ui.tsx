import Link from 'next/link'
import { Arrow } from './Icon'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

/** Visible breadcrumb trail + matching BreadcrumbList data for Google. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const trail = [{ label: 'Home', href: '/' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="crumbs fade">
        <ol>
          {trail.map((c, i) => (
            <li key={c.label}>
              {c.href && i < trail.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: new URL(c.href, SITE_URL).toString() } : {}),
          })),
        }}
      />
    </>
  )
}

export function CtaBand({ title, accent, text, label = 'Book Free Consultation', href = '/contact' }: { title: string; accent: string; text: string; label?: string; href?: string }) {
  return (
    <section className="container cta-band-wrap" aria-labelledby="cta-band-h">
      <div className="cta-band reveal">
        <h2 id="cta-band-h" className="h-2">{title} <span className="grad">{accent}</span></h2>
        <p className="lead" style={{ margin: '18px auto 0' }}>{text}</p>
        <Link href={href} className="btn btn-light magnetic" style={{ marginTop: 30 }}>{label}<Arrow size={18} /></Link>
      </div>
    </section>
  )
}
