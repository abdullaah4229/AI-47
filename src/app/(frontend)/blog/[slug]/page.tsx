import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '../../services.css'
import '../../blog.css'

import { Arrow } from '@/components/Icon'
import { NewsletterSignup } from '@/components/forms/NewsletterSignup'
import '../../forms.css'
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/ui'
import { PostBody } from '@/components/blog/PostBody'
import { PostCard } from '@/components/blog/PostCard'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { formatDate, getAllPublishedSlugs, getPost, getRelatedPosts } from '@/lib/blog'

export const revalidate = 60
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs()
  // A static export needs at least one page per route; with no published posts this renders the 404 page
  if (!slugs.length && process.env.STATIC_EXPORT === '1') return [{ slug: 'no-posts-yet' }]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.metaTitle} | AI 742`,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(post.author ? { authors: [post.author.name] } : {}),
      ...(post.cover ? { images: [{ url: post.cover.url, alt: post.cover.alt }] } : {}),
    },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const related = await getRelatedPosts(post)
  const url = `${SITE_URL}/blog/${post.slug}`

  return (
    <div className="svc-page">
      <ReadingProgress targetId="post-article" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: url,
          ...(post.cover ? { image: new URL(post.cover.url, SITE_URL).toString() } : {}),
          ...(post.author ? { author: { '@type': 'Person', name: post.author.name } } : { author: { '@type': 'Organization', name: 'AI 742' } }),
          publisher: { '@type': 'Organization', name: 'AI 742', url: SITE_URL },
          ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
        }}
      />

      <article id="post-article">
        <header className="container post-head">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, ...(post.category ? [{ label: post.category.name, href: `/blog/category/${post.category.slug}` }] : []), { label: post.title }]} />
          <h1 className="post-h1 fade" style={{ animationDelay: '.1s' }}>{post.title}</h1>
          <p className="lead fade" style={{ marginTop: 22, animationDelay: '.2s' }}>{post.excerpt}</p>
          <div className="post-byline fade" style={{ animationDelay: '.3s' }}>
            <div className="byline-left">
              {post.author?.photo ? (
                <span className="avatar"><Image src={post.author.photo.url} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} /></span>
              ) : (
                <span className="avatar avatar--orb" aria-hidden="true" />
              )}
              <div>
                <div style={{ fontWeight: 600 }}>{post.author?.name || 'AI 742'}</div>
                <div className="muted" style={{ fontSize: 14 }}>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
                </div>
              </div>
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>
        </header>

        {post.cover && (
          <figure className="container post-cover-figure fade" style={{ animationDelay: '.35s' }}>
            <div className="post-cover-img">
              <Image src={post.cover.url} alt={post.cover.alt} fill priority sizes="(max-width: 1240px) 100vw, 1180px" style={{ objectFit: 'cover' }} />
            </div>
          </figure>
        )}

        <div className="container post-layout">
          {post.headings.length > 1 && (
            <aside className="toc" aria-label="On this page">
              <div className="mono-small" style={{ letterSpacing: '.14em', marginBottom: 14 }}>On this page</div>
              {post.headings.map((h) => (
                <a key={h.id} href={`#${h.id}`} className={`toc-link${h.level === 3 ? ' toc-link--sub' : ''}`}>{h.text}</a>
              ))}
              {post.keyTakeaways.length > 0 && <a href="#key-takeaways" className="toc-link">Key takeaways</a>}
            </aside>
          )}
          <div className="post-main">
            <PostBody data={post.content} />
            {post.keyTakeaways.length > 0 && (
              <section id="key-takeaways" className="takeaways" aria-labelledby="kt-h">
                <h2 id="kt-h" className="eyebrow" style={{ fontSize: 12 }}>Key takeaways</h2>
                <ul>{post.keyTakeaways.map((k) => <li key={k}>{k}</li>)}</ul>
              </section>
            )}
            {post.tags.length > 0 && (
              <ul className="tags" aria-label="Tags">{post.tags.map((t) => <li key={t}>#{t}</li>)}</ul>
            )}
            {post.author && (
              <div className="author-box">
                {post.author.photo ? (
                  <span className="avatar avatar--lg"><Image src={post.author.photo.url} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} /></span>
                ) : (
                  <span className="avatar avatar--lg avatar--orb" aria-hidden="true" />
                )}
                <div>
                  <div className="h-3" style={{ fontSize: 20 }}>{post.author.name}</div>
                  {post.author.role && <div style={{ color: 'var(--cyan-soft)', fontSize: 14 }}>{post.author.role}, AI 742</div>}
                  {post.author.bio && <p className="muted" style={{ margin: '10px 0 0', fontSize: 15 }}>{post.author.bio}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container" aria-labelledby="rel-h" style={{ padding: '60px 24px 80px' }}>
          <div className="split-row">
            <h2 id="rel-h" className="h-3" style={{ fontSize: 28 }}>Keep reading</h2>
            <Link href="/blog" className="more">All posts<Arrow size={14} /></Link>
          </div>
          <div className="post-grid" style={{ marginTop: 24 }}>
            {related.map((p, i) => <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}><PostCard post={p} i={i} /></div>)}
          </div>
        </section>
      )}

      <NewsletterSignup source="blog" />
      <CtaBand title="Want this working in" accent="your business?" text="Book a free consultation with an AI consultant." />
    </div>
  )
}
