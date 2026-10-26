import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../../../services.css'
import '../../../blog.css'

import { Breadcrumbs } from '@/components/ui'
import { getCategories, getPosts } from '@/lib/blog'
import { BlogIndex } from '../../BlogIndex'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = (await getCategories()).find((c) => c.slug === slug)
  if (!cat) notFound()
  const title = `${cat.name} — AI for Small Business Blog`
  const description = cat.description || `Posts about ${cat.name.toLowerCase()} from the AI 742 blog.`
  return { title, description, alternates: { canonical: `/blog/category/${slug}` }, openGraph: { title: `${title} | AI 742`, description, url: `/blog/category/${slug}` } }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) notFound()
  const { posts, totalPages } = await getPosts({ categorySlug: slug, page })
  return (
    <div className="svc-page">
      <section className="page-hero blog-hero">
        <div className="page-orb page-orb--blog" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: cat.name }]} />
          <h1 className="h-1 fade" style={{ marginTop: 22, animationDelay: '.1s' }}><span className="grad">{cat.name}</span></h1>
          {cat.description && <p className="lead fade" style={{ marginTop: 22, animationDelay: '.2s' }}>{cat.description}</p>}
        </div>
      </section>
      <BlogIndex posts={posts} categories={categories} active={slug} page={page} totalPages={totalPages} basePath={`/blog/category/${slug}`} showFeatured={false} />
    </div>
  )
}
