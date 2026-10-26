import { getPosts } from '@/lib/blog'

export const revalidate = 300

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS feed of the latest published posts: /blog/rss.xml */
export async function GET() {
  const { posts } = await getPosts({ limit: 30 })
  const items = posts
    .map((p) => `<item><title>${esc(p.title)}</title><link>${SITE_URL}/blog/${p.slug}</link><guid>${SITE_URL}/blog/${p.slug}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description>${p.category ? `<category>${esc(p.category.name)}</category>` : ''}</item>`)
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>AI 742 Blog — AI for Small Business</title><link>${SITE_URL}/blog</link><description>Practical opinions and lessons on AI for small business.</description><language>en-us</language>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
