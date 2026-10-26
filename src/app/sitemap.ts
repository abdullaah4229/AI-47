import type { MetadataRoute } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 3600
const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** /sitemap.xml — every public page, updated automatically when content changes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const page = (path: string, priority: number, lastModified: Date | string = now, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') => ({
    url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority,
  })
  const entries: MetadataRoute.Sitemap = [
    page('/', 1, now, 'weekly'),
    page('/services', 0.9),
    page('/industries', 0.8),
    page('/how-it-works', 0.7),
    page('/about', 0.7),
    page('/contact', 0.8),
    page('/ai-readiness-assessment', 0.8),
    page('/blog', 0.7, now, 'weekly'),
    page('/privacy-policy', 0.2, now, 'yearly'),
    page('/terms', 0.2, now, 'yearly'),
  ]
  try {
    const payload = await getPayload({ config })
    const [services, industries, posts, categories] = await Promise.all([
      payload.find({ collection: 'services', limit: 200, depth: 0, select: { slug: true, updatedAt: true } }),
      payload.find({ collection: 'industries', limit: 200, depth: 0, select: { slug: true, updatedAt: true } }),
      payload.find({ collection: 'posts', where: { _status: { equals: 'published' } }, limit: 2000, depth: 0, select: { slug: true, updatedAt: true } }),
      payload.find({ collection: 'categories', limit: 100, depth: 0, select: { slug: true, updatedAt: true } }),
    ])
    for (const s of services.docs) entries.push(page(`/services/${s.slug}`, s.slug === 'ai-receptionist' || s.slug === 'ai-consulting' ? 0.9 : 0.8, s.updatedAt))
    for (const i of industries.docs) entries.push(page(`/industries/${i.slug}`, 0.7, i.updatedAt))
    for (const p of posts.docs) entries.push(page(`/blog/${p.slug}`, 0.6, p.updatedAt, 'yearly'))
    for (const c of categories.docs) entries.push(page(`/blog/category/${c.slug}`, 0.4, c.updatedAt, 'weekly'))
  } catch {}
  return entries
}
