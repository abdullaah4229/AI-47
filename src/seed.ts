/**
 * Fills the database with starting content. Safe to run again:
 * it never overwrites anything you have already written in the admin panel.
 *   npm run seed
 */
import { getPayload } from 'payload'
import config from './payload.config'
import { DEFAULT_FAQS, DEFAULT_INDUSTRIES, DEFAULT_SERVICES } from './content/defaults'
import { SERVICE_DETAILS } from './content/serviceDetails'
import { INDUSTRY_DETAILS } from './content/pages'

const payload = await getPayload({ config })

const seed = async (collection: 'services' | 'industries' | 'faqs', items: Record<string, unknown>[]) => {
  const existing = await payload.count({ collection })
  if (existing.totalDocs > 0) {
    payload.logger.info(`${collection}: already has ${existing.totalDocs} items — skipped`)
    return
  }
  for (const [i, item] of items.entries()) {
    await payload.create({ collection, data: { ...item, order: (i + 1) * 10, showOnHome: item.showOnHome ?? true } as never })
  }
  payload.logger.info(`${collection}: added ${items.length} items`)
}

await seed('services', DEFAULT_SERVICES)
await seed('industries', DEFAULT_INDUSTRIES)
await seed('faqs', DEFAULT_FAQS)

// Milestone 3: add service-page content to services that don't have it yet.
const { docs: services } = await payload.find({ collection: 'services', limit: 100, depth: 0 })
let filled = 0
for (const s of services) {
  const d = SERVICE_DETAILS[s.slug]
  if (!d) continue
  const data: Record<string, unknown> = {}
  if (!s.heroTitle) { data.heroTitle = d.heroTitle; data.heroAccent = d.heroAccent }
  if (!s.intro) data.intro = d.intro
  if (!s.usesHeadline) data.usesHeadline = d.usesHeadline
  if (!s.useCases?.length) data.useCases = d.useCases
  if (!s.faqs?.length && d.faqs) data.faqs = d.faqs
  if (!s.metaTitle) data.metaTitle = d.metaTitle
  if (!s.metaDescription) data.metaDescription = d.metaDescription
  if (d.template && (!s.template || s.template === 'standard')) data.template = d.template
  if (Object.keys(data).length) {
    await payload.update({ collection: 'services', id: s.id, data: data as never })
    filled++
  }
}
payload.logger.info(`service pages: filled in ${filled} services`)
// Milestone 4: add industry-page content to industries that don't have it yet.
const { docs: industries } = await payload.find({ collection: 'industries', limit: 100, depth: 0 })
const slugToId = Object.fromEntries(services.map((s) => [s.slug, s.id]))
let inds = 0
for (const ind of industries) {
  const d = INDUSTRY_DETAILS[ind.slug]
  if (!d) continue
  const data: Record<string, unknown> = {}
  if (!ind.heroTitle) { data.heroTitle = d.heroTitle; data.heroAccent = d.heroAccent }
  if (!ind.intro) data.intro = d.intro
  if (!ind.useCases?.length) data.useCases = d.useCases
  if (!ind.flow?.length) data.flow = d.flow.map((text) => ({ text }))
  if (!ind.note && d.note) data.note = d.note
  if (!ind.faqs?.length && d.faqs) data.faqs = d.faqs
  if (!ind.relatedServices?.length) data.relatedServices = d.related.map((s) => slugToId[s]).filter(Boolean)
  if (!ind.metaTitle) data.metaTitle = d.metaTitle
  if (!ind.metaDescription) data.metaDescription = d.metaDescription
  if (Object.keys(data).length) {
    await payload.update({ collection: 'industries', id: ind.id, data: data as never })
    inds++
  }
}
payload.logger.info(`industry pages: filled in ${inds} industries`)
// Milestone 5: blog categories + one example DRAFT post (not visible on the website).
const CATS = [
  { name: 'Claude', slug: 'claude', description: 'Honest takes on Claude — what it does well, where it fits, and how small businesses can use it.' },
  { name: 'AI for Small Business', slug: 'ai-for-small-business', description: 'Practical guides to using AI in a growing business.' },
  { name: 'AI Strategy', slug: 'ai-strategy', description: 'Planning, governance, and choosing where AI fits first.' },
  { name: 'Automation', slug: 'automation', description: 'Real automations, lessons learned, and tools worth knowing.' },
  { name: 'Industry Takes', slug: 'industry-takes', description: 'What AI means for law firms, real estate, healthcare administration, and more.' },
]
if ((await payload.count({ collection: 'categories' })).totalDocs === 0) {
  for (const [i, c] of CATS.entries()) await payload.create({ collection: 'categories', data: { ...c, order: (i + 1) * 10 } })
  payload.logger.info(`blog categories: added ${CATS.length}`)
}
if ((await payload.count({ collection: 'posts' })).totalDocs === 0) {
  const t = (text: string, format = 0) => ({ type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 })
  const base = { format: '', indent: 0, version: 1, direction: 'ltr' }
  const para = (...c: ReturnType<typeof t>[]) => ({ ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: c })
  const h = (tag: string, text: string) => ({ ...base, type: 'heading', tag, children: [t(text)] })
  const quote = (text: string) => ({ ...base, type: 'quote', children: [t(text)] })
  const ul = (items: string[]) => ({ ...base, type: 'list', listType: 'bullet', start: 1, tag: 'ul', children: items.map((x, i) => ({ ...base, type: 'listitem', value: i + 1, children: [t(x)] })) })
  const claude = await payload.find({ collection: 'categories', where: { slug: { equals: 'claude' } }, limit: 1 })
  await payload.create({
    collection: 'posts',
    draft: true,
    data: {
      title: 'Example post — how to write for the AI 742 blog (delete me)',
      slug: 'example-post',
      _status: 'draft',
      excerpt: 'A private example that shows how each part of a post appears on the website. It stays a draft, so visitors never see it.',
      category: claude.docs[0]?.id,
      tags: [{ tag: 'Claude' }, { tag: 'Example' }],
      keyTakeaways: [{ text: 'Use Heading 2 for main sections' }, { text: 'Fill in the excerpt and SEO tab' }, { text: 'Click Publish when ready' }],
      content: { root: { ...base, type: 'root', children: [
        para(t('The first paragraph is shown slightly larger. Open with your main point in two or three sentences.')),
        h('h2', 'Sections build the “On this page” menu'),
        para(t('Every '), t('Heading 2', 1), t(' and Heading 3 appears in the menu beside the article, so readers can jump straight to it.')),
        quote('Quotes become large pull quotes — use them for the one line you want people to share.'),
        h('h2', 'Before you publish'),
        ul(['Write a clear excerpt (it appears on cards and in Google)', 'Add a cover image in Content → Media', 'Check the SEO tab', 'Press Publish']),
      ] } },
    } as never,
  })
  payload.logger.info('blog: added 1 example draft post (private)')
}
payload.logger.info('Seed complete.')
process.exit(0)
