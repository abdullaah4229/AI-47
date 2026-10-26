import Image from 'next/image'
import Link from 'next/link'
import { formatDate, type PostCard as Card } from '@/lib/blog'

const COVERS = [
  'radial-gradient(circle at 30% 40%, rgba(0,229,255,.5), transparent 45%), #080D1A',
  'radial-gradient(circle at 70% 30%, rgba(139,92,246,.55), transparent 45%), #080D1A',
  'linear-gradient(135deg, rgba(37,99,235,.5), transparent 60%), #080D1A',
]

export function PostCover({ post, i = 0, sizes }: { post: Card; i?: number; sizes: string }) {
  return post.cover ? (
    <Image src={post.cover.url} alt={post.cover.alt || ''} fill sizes={sizes} style={{ objectFit: 'cover' }} />
  ) : (
    <span className="post-cover-art" style={{ background: COVERS[i % COVERS.length] }} aria-hidden="true" />
  )
}

export function PostCard({ post, i = 0 }: { post: Card; i?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card spot post-card">
      <span className="post-cover"><PostCover post={post} i={i} sizes="(max-width: 700px) 100vw, 400px" /></span>
      <span className="post-body">
        {post.category && <span className="post-cat">{post.category.name}</span>}
        <span className="post-title">{post.title}</span>
        <span className="post-meta">{formatDate(post.publishedAt)} · {post.readingMinutes} min read</span>
      </span>
    </Link>
  )
}
