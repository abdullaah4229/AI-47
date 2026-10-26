import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_FAQS, DEFAULT_HOME, DEFAULT_INDUSTRIES, DEFAULT_SERVICES } from '@/content/defaults'

export type Home = typeof DEFAULT_HOME
export type ServiceCard = { title: string; slug: string; icon: string; summary: string }
export type IndustryCard = { name: string; slug: string; icon: string; opportunities: string; summary: string }
export type Faq = { question: string; answer: string }

type Loose = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

/** Merge saved homepage content over the defaults so empty fields never break the page. */
const merge = <T extends Loose>(def: T, saved?: Loose | null): T => {
  if (!saved) return def
  const out: Loose = { ...def }
  for (const k of Object.keys(def)) {
    const v = saved[k]
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(def[k])) out[k] = Array.isArray(v) && v.length ? v : def[k]
    else if (typeof def[k] === 'object') out[k] = merge(def[k], v)
    else out[k] = v
  }
  return out as T
}

export const getHomeData = cache(async () => {
  const fallback = {
    home: DEFAULT_HOME,
    services: DEFAULT_SERVICES.filter((s) => s.showOnHome !== false) as ServiceCard[],
    industries: DEFAULT_INDUSTRIES.filter((s) => s.showOnHome !== false) as IndustryCard[],
    faqs: DEFAULT_FAQS as Faq[],
  }
  try {
    const payload = await getPayload({ config })
    const [home, services, industries, faqs] = await Promise.all([
      payload.findGlobal({ slug: 'homepage', depth: 0 }),
      payload.find({ collection: 'services', where: { showOnHome: { equals: true } }, sort: 'order', limit: 24, depth: 0 }),
      payload.find({ collection: 'industries', where: { showOnHome: { equals: true } }, sort: 'order', limit: 24, depth: 0 }),
      payload.find({ collection: 'faqs', where: { showOnHome: { equals: true } }, sort: 'order', limit: 20, depth: 0 }),
    ])
    return {
      home: merge(DEFAULT_HOME, home as Loose),
      services: services.docs.length ? (services.docs as unknown as ServiceCard[]) : fallback.services,
      industries: industries.docs.length ? (industries.docs as unknown as IndustryCard[]) : fallback.industries,
      faqs: faqs.docs.length ? (faqs.docs as unknown as Faq[]) : fallback.faqs,
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.warn('[AI 742] Using default homepage content:', err)
    return fallback
  }
})
