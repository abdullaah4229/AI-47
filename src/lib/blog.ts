import { cache } from 'react'
import config from '@payload-config'
import { getPayload, type Where } from 'payload'

type Raw = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export type Media = { url: string; alt: string; width?: number; height?: number }
export type Category = { name: string; slug: string; description?: string }
export type PostCard = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readingMinutes: number
  category?: Category
  cover?: Media
  featured?: boolean
}
export type Heading = { id: string; text: string; level: 2 | 3 }
export type Post = PostCard & {
  id: string | number
  content: Raw
  headings: Heading[]
  keyTakeaways: string[]
  tags: string[]
  author?: { name: string; role?: string; bio?: string; photo?: Media }
  metaTitle: string
  metaDescription: string
  updatedAt: string
}

export const slugifyHeading = (s: string) =>
  s.toLowerCase().replace(/[’'"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section'

/** All plain text inside a Lexical node. */
export const nodeText = (node: Raw): string =>
  node?.text ?? (Array.isArray(node?.children) ? node.children.map(nodeText).join('') : '')

const words = (content: Raw) => nodeText(content?.root ?? {}).split(/\s+/).filter(Boolean).length
const readingMinutes = (content: Raw) => Math.max(1, Math.round(words(content) / 225))

const headingsOf = (content: Raw): Heading[] => {
  const seen = new Map<string, number>()
  return ((content?.root?.children ?? []) as Raw[])
    .filter((n) => n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3'))
    .map((n) => {
      const text = nodeText(n)
      let id = slugifyHeading(text)
      const count = seen.get(id) ?? 0
      seen.set(id, count + 1)
      if (count) id = `${id}-${count + 1}`
      return { id, text, level: n.tag === 'h2' ? 2 : 3 }
    })
}

const media = (m: Raw | undefined | null): Media | undefined =>
  m && typeof m === 'object' && m.url ? { url: m.sizes?.card?.url || m.url, alt: m.alt || '', width: m.width, height: m.height } : undefined
const mediaFull = (m: Raw | undefined | null): Media | undefined =>
  m && typeof m === 'object' && m.url ? { url: m.sizes?.hero?.url || m.url, alt: m.alt || '', width: m.width, height: m.height } : undefined
const category = (c: Raw | undefined | null): Category | undefined =>
  c && typeof c === 'object' ? { name: c.name, slug: c.slug, description: c.description || undefined } : undefined

const toCard = (p: Raw): PostCard => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  publishedAt: p.publishedAt || p.createdAt,
  readingMinutes: readingMinutes(p.content),
  category: category(p.category),
  cover: media(p.coverImage),
  featured: Boolean(p.featured),
})

const PUBLISHED: Where = { _status: { equals: 'published' } }

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'categories', sort: 'order', limit: 50, depth: 0 })
    return (res.docs as Raw[]).map((c) => category(c)!)
  } catch {
    return []
  }
})

export const getPosts = cache(async (opts: { categorySlug?: string; page?: number; limit?: number } = {}) => {
  const { categorySlug, page = 1, limit = 12 } = opts
  try {
    const payload = await getPayload({ config })
    let where: Where = PUBLISHED
    if (categorySlug) {
      const cat = await payload.find({ collection: 'categories', where: { slug: { equals: categorySlug } }, limit: 1, depth: 0 })
      if (!cat.docs[0]) return { posts: [] as PostCard[], totalPages: 0, page }
      where = { and: [PUBLISHED, { category: { equals: cat.docs[0].id } }] }
    }
    const res = await payload.find({ collection: 'posts', where, sort: '-publishedAt', page, limit, depth: 1 })
    return { posts: (res.docs as Raw[]).map(toCard), totalPages: res.totalPages, page: res.page ?? page }
  } catch {
    return { posts: [] as PostCard[], totalPages: 0, page }
  }
})

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', where: { and: [PUBLISHED, { slug: { equals: slug } }] }, limit: 1, depth: 2 })
    const p = res.docs[0] as Raw | undefined
    if (!p) return null
    const a = p.author && typeof p.author === 'object' ? p.author : null
    return {
      ...toCard(p),
      id: p.id,
      cover: mediaFull(p.coverImage),
      content: p.content,
      headings: headingsOf(p.content),
      keyTakeaways: (p.keyTakeaways || []).map((k: Raw) => k.text).filter(Boolean),
      tags: (p.tags || []).map((t: Raw) => t.tag).filter(Boolean),
      author: a?.name ? { name: a.name, role: a.jobTitle || undefined, bio: a.bio || undefined, photo: media(a.photo) } : undefined,
      metaTitle: p.metaTitle || p.title,
      metaDescription: p.metaDescription || p.excerpt,
      updatedAt: p.updatedAt,
    }
  } catch {
    return null
  }
})

export const getRelatedPosts = cache(async (post: Post, limit = 3): Promise<PostCard[]> => {
  try {
    const payload = await getPayload({ config })
    const notThis: Where = { id: { not_equals: post.id } }
    const base: Where = post.category
      ? { and: [PUBLISHED, notThis, { 'category.slug': { equals: post.category.slug } }] }
      : { and: [PUBLISHED, notThis] }
    let res = await payload.find({ collection: 'posts', where: base, sort: '-publishedAt', limit, depth: 1 })
    if (res.docs.length < limit) res = await payload.find({ collection: 'posts', where: { and: [PUBLISHED, notThis] }, sort: '-publishedAt', limit, depth: 1 })
    return (res.docs as Raw[]).map(toCard)
  } catch {
    return []
  }
})

export const getAllPublishedSlugs = cache(async (): Promise<string[]> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', where: PUBLISHED, limit: 1000, depth: 0, select: { slug: true } })
    return (res.docs as Raw[]).map((p) => p.slug)
  } catch {
    return []
  }
})

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
