import Link from 'next/link'
import { Logo } from './Logo'
import type { SiteData } from '@/lib/site'

const isExternal = (href: string) => /^https?:\/\//.test(href)

export function Footer({ site }: { site: SiteData }) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo size={34} />
          <p className="footer-desc">{site.footerDescription}</p>
          {site.contactEmail && (
            <a className="flink" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          )}
        </div>
        {site.footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="footer-title">{col.title}</h2>
            <ul className="footer-links">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link className="flink" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        {site.social.length > 0 && (
          <nav aria-label="Social media">
            <h2 className="footer-title">Connect</h2>
            <ul className="footer-links">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a className="flink" href={s.href} target={isExternal(s.href) ? '_blank' : undefined} rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="container footer-bottom">
        <span>© {year} AI 742. All Rights Reserved.</span>
        <span className="footer-legal">
          <Link className="flink" href="/privacy-policy">Privacy Policy</Link>
          <Link className="flink" href="/terms">Terms of Service</Link>
        </span>
      </div>
      <div className="container giant" aria-hidden="true">AI 742</div>
    </footer>
  )
}
