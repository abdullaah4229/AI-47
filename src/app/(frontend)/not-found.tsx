import Link from 'next/link'

/** Shown when a service, industry or post address doesn't exist. */
export default function NotFound() {
  return (
    <section className="container section" style={{ textAlign: 'center', minHeight: '60vh' }}>
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="h-1" style={{ marginTop: 16 }}>This page <span className="grad">doesn’t exist.</span></h1>
      <p className="lead" style={{ margin: '20px auto 0' }}>The link may be old or mistyped. Try one of these instead.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 32 }}>
        <Link href="/" className="btn btn-primary">Back to homepage</Link>
        <Link href="/services" className="btn btn-ghost">Explore services</Link>
        <Link href="/contact" className="btn btn-ghost">Contact us</Link>
      </div>
    </section>
  )
}
