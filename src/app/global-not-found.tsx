import type { Metadata } from 'next'
import Link from 'next/link'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './(frontend)/globals.css'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = { title: 'Page not found | AI 742', robots: { index: false } }

/** Branded 404 for any address that doesn't exist. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="container section" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/" aria-label="AI 742 home" style={{ textDecoration: 'none' }}><Logo /></Link>
          <p className="eyebrow" style={{ marginTop: 40 }}>404 · Page not found</p>
          <h1 className="h-1" style={{ marginTop: 16 }}>This page <span className="grad">doesn’t exist.</span></h1>
          <p className="lead" style={{ margin: '20px auto 0' }}>The link may be old or mistyped. Try one of these instead.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 32 }}>
            <Link href="/" className="btn btn-primary">Back to homepage</Link>
            <Link href="/services" className="btn btn-ghost">Explore services</Link>
            <Link href="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </main>
      </body>
    </html>
  )
}
