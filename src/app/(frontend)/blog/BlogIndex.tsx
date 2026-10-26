import Link from 'next/link'
import { Arrow } from '@/components/Icon'
import { PostCard, PostCover } from '@/components/blog/PostCard'
import { formatDate, type Category, type PostCard as Card } from '@/lib/blog'

/** Shared layout for /blog and /blog/category/[slug]. */
export function BlogIndex({ posts, categories, active, page, totalPages, basePath, showFeatured }: {
  posts: Card[]
  categories: Category[]
  active?: string
  page: number
  totalPages: number
  basePath: string
  showFeatured: boolean
}) {
  const featured = showFeatured && page === 1 ? posts.find((p) => p.featured) || posts[0] : undefined
  const rest = featured ? posts.filter((p) => p !== featured) : posts
  return (
    <>
      <nav aria-label="Blog categories" className="container cat-chips fade" style={{ animationDelay: '.3s' }}>
        <Link href="/blog" className={`chip-link${!active ? ' is-on' : ''}`} aria-current={!active ? 'page' : undefined}>All</Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}`} className={`chip-link${active === c.slug ? ' is-on' : ''}`} aria-current={active === c.slug ? 'page' : undefined}>{c.name}</Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <section className="container empty-blog reveal">
          <h2 className="h-3">First posts are on the way.</h2>
          <p className="muted">Practical takes on AI for small business — and plenty on Claude — are coming soon.</p>
          <Link href="/contact" className="more">Have a question in the meantime? Talk to us<Arrow size={14} /></Link>
        </section>
      ) : (
        <>
          {featured && (
            <section className="container" aria-label="Featured post" style={{ paddingBottom: 24 }}>
              <Link href={`/blog/${featured.slug}`} className="featured spot reveal">
                <span className="featured-cover"><PostCover post={featured} sizes="(max-width: 900px) 100vw, 640px" /></span>
                <span className="featured-body">
                  <span className="post-cat">Featured{featured.category ? ` · ${featured.category.name}` : ''}</span>
                  <span className="featured-title">{featured.title}</span>
                  <span className="muted">{featured.excerpt}</span>
                  <span className="post-meta">{formatDate(featured.publishedAt)} · {featured.readingMinutes} min read</span>
                </span>
              </Link>
            </section>
          )}
          <section className="container" aria-label="Latest posts" style={{ paddingBottom: 60 }}>
            <div className="post-grid">
              {rest.map((p, i) => (
                <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}><PostCard post={p} i={i + 1} /></div>
              ))}
            </div>
            {totalPages > 1 && (
              <nav className="pager" aria-label="Pagination">
                {page > 1 ? <Link href={page === 2 ? basePath : `${basePath}?page=${page - 1}`} className="btn btn-ghost btn-sm" rel="prev">← Newer posts</Link> : <span />}
                <span className="mono-small">Page {page} of {totalPages}</span>
                {page < totalPages ? <Link href={`${basePath}?page=${page + 1}`} className="btn btn-ghost btn-sm" rel="next">Older posts →</Link> : <span />}
              </nav>
            )}
          </section>
        </>
      )}
    </>
  )
}
