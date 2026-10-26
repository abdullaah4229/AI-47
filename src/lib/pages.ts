import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_INDUSTRIES, DEFAULT_SERVICES } from '@/content/defaults'
import { DEFAULT_ABOUT, DEFAULT_HOW, INDUSTRY_DETAILS, industryFaqs } from '@/content/pages'

type Raw = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export type IndustryPage = {
  name: string
  slug: string
  icon: string
  summary: string
  opportunities: string
  heroTitle: string
  heroAccent: string
  intro: string
  useCases: { title: string; text: string }[]
  flow: string[]
  note: string
  faqs: { question: string; answer: string }[]
  related: { title: string; slug: string; icon: string }[]
  metaTitle: string
  metaDescription: string
}

const svcBySlug = Object.fromEntries(DEFAULT_SERVICES.map((s) => [s.slug, s]))

const toIndustry = (raw: Raw): IndustryPage => {
  const d = INDUSTRY_DETAILS[raw.slug]
  const rel = (raw.relatedServices || []).filter((r: Raw) => typeof r === 'object') as Raw[]
  const related = rel.length ? rel : (d?.related || []).map((s) => svcBySlug[s]).filter(Boolean)
  return {
    name: raw.name,
    slug: raw.slug,
    icon: raw.icon || 'brief',
    summary: raw.summary,
    opportunities: raw.opportunities || '',
    heroTitle: raw.heroTitle || d?.heroTitle || 'AI for',
    heroAccent: raw.heroTitle ? raw.heroAccent || '' : d?.heroAccent || `${raw.name}.`,
    intro: raw.intro || d?.intro || raw.summary,
    useCases: raw.useCases?.length ? raw.useCases : d?.useCases || [],
    flow: raw.flow?.length ? raw.flow.map((f: Raw) => f.text) : d?.flow || [],
    note: raw.note || (raw.heroTitle ? '' : d?.note || ''),
    faqs: raw.faqs?.length ? raw.faqs : d?.faqs || industryFaqs(raw.name),
    related: related.map((s: Raw) => ({ title: s.title, slug: s.slug, icon: s.icon || 'spark' })),
    metaTitle: raw.metaTitle || d?.metaTitle || `AI for ${raw.name}`,
    metaDescription: raw.metaDescription || d?.metaDescription || raw.summary,
  }
}

export const getIndustries = cache(async (): Promise<IndustryPage[]> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'industries', sort: 'order', limit: 100, depth: 1 })
    if (res.docs.length) return (res.docs as Raw[]).map(toIndustry)
  } catch {}
  return (DEFAULT_INDUSTRIES as Raw[]).map(toIndustry)
})

export const getIndustry = cache(async (slug: string) => (await getIndustries()).find((i) => i.slug === slug) || null)

type Loose = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
const fill = <T extends Loose>(def: T, saved?: Loose | null): T => {
  if (!saved) return def
  const out: Loose = { ...def }
  for (const k of Object.keys(def)) {
    const v = saved[k]
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue
    out[k] = v
  }
  for (const k of ['founderPhoto']) if (saved[k]) out[k] = saved[k]
  return out as T
}

export const getHowItWorks = cache(async () => {
  try {
    const payload = await getPayload({ config })
    return fill(DEFAULT_HOW, (await payload.findGlobal({ slug: 'how-it-works', depth: 0 })) as Loose)
  } catch {
    return DEFAULT_HOW
  }
})

export const getAbout = cache(async () => {
  try {
    const payload = await getPayload({ config })
    return fill(DEFAULT_ABOUT, (await payload.findGlobal({ slug: 'about', depth: 1 })) as Loose) as typeof DEFAULT_ABOUT & { founderPhoto?: { url?: string; alt?: string } }
  } catch {
    return DEFAULT_ABOUT as typeof DEFAULT_ABOUT & { founderPhoto?: { url?: string; alt?: string } }
  }
})
