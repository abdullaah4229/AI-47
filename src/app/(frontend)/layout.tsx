import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './globals.css'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MotionProvider } from '@/components/MotionProvider'
import { getSiteData } from '@/lib/site'
import { JsonLd } from '@/components/ui'


const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData()
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.defaultTitle, template: '%s | AI 742' },
    description: site.defaultDescription,
    openGraph: { type: 'website', siteName: site.siteName, locale: 'en_US' },
    twitter: { card: 'summary_large_image' },
  }
}

export const viewport: Viewport = { themeColor: '#050505', colorScheme: 'dark' }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteData()
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'AI 742', url: SITE_URL, logo: `${SITE_URL}/icon.svg`, ...(site.contactEmail ? { email: site.contactEmail } : {}), ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}) }} />
        <MotionProvider />
        <Header menu={site.mainMenu} ctaLabel={site.ctaLabel} ctaHref={site.ctaHref} />
        <main id="main">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  )
}
