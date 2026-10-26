import type { Metadata } from 'next'
import '../services.css'
import '../blog.css'

import { NewsletterSignup } from '@/components/forms/NewsletterSignup'
import '../forms.css'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { getCategories, getPosts } from '@/lib/blog'
import { BlogIndex } from './BlogIndex'

const TITLE = 'AI for Small Business Blog'
const DESCRIPTION = 'Practical opinions and lessons on AI for small business — automation, AI strategy, industry takes, and a close look at Claude.'

type Props = { searchParams: Promise<{ page?: string }> }

// A static export (GitHub Pages) has no query string at build time, so it always renders page 1
const pageFrom = async (searchParams: Props['searchParams']) =>
  process.env.STATIC_EXPORT === '1' ? 1 : Math.max(1, Number((await searchParams).page) || 1)

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = await pageFrom(searchParams)
  return {
    title: page > 1 ? `${TITLE} — Page ${page}` : TITLE,
    description: DESCRIPTION,
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
    openGraph: { title: `${TITLE} | AI 742`, description: DESCRIPTION, url: '/blog' },
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const page = await pageFrom(searchParams)
  const [{ posts, totalPages }, categories] = await Promise.all([getPosts({ page }), getCategories()])
  return (
    <div className="svc-page">
      <section className="page-hero blog-hero">
        <div className="page-orb page-orb--blog" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Breadcrumbs items={[{ label: 'Blog' }]} />
          <p className="eyebrow fade" style={{ marginTop: 22 }}>The Intelligence Log</p>
          <h1 className="h-1 fade" style={{ marginTop: 18, maxWidth: 980, animationDelay: '.1s' }}>AI for Small Business, <span className="grad">written by a builder.</span></h1>
          <p className="lead fade" style={{ marginTop: 24, animationDelay: '.2s' }}>Field notes, honest takes, and practical lessons on artificial intelligence — with a close eye on Claude.</p>
        </div>
      </section>
      <BlogIndex posts={posts} categories={categories} page={page} totalPages={totalPages} basePath="/blog" showFeatured />
      <NewsletterSignup source="blog" />
      <CtaBand title="Want this working in" accent="your business?" text="Book a free consultation and turn ideas from the blog into automations that save real time." />
    </div>
  )
}
