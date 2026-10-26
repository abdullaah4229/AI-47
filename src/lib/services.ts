import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_SERVICES } from '@/content/defaults'
import { DEFAULT_INCLUDED, DEFAULT_PROCESS, GENERIC_FAQS, SERVICE_DETAILS } from '@/content/serviceDetails'

type Pair = { title: string; text: string }
type Faq = { question: string; answer: string }

export type ServicePage = {
  id?: string | number
  title: string
  slug: string
  summary: string
  icon: string
  template: 'standard' | 'receptionist'
  heroTitle: string
  heroAccent: string
  intro: string
  usesHeadline: string
  useCases: Pair[]
  included: string[]
  process: Pair[]
  faqs: Faq[]
  metaTitle: string
  metaDescription: string
  related: { title: string; slug: string; icon: string }[]
}

type Raw = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

const toPage = (raw: Raw, all: Raw[]): ServicePage => {
  const d = SERVICE_DETAILS[raw.slug]
  const related = (raw.related?.length ? raw.related.filter((r: Raw) => typeof r === 'object') : null) as Raw[] | null
  const idx = all.findIndex((s) => s.slug === raw.slug)
  const auto = [...all.slice(idx + 1), ...all.slice(0, idx)].filter((s) => s.slug !== raw.slug).slice(0, 3)
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    summary: raw.summary,
    icon: raw.icon || 'spark',
    template: raw.template || d?.template || 'standard',
    heroTitle: raw.heroTitle || d?.heroTitle || raw.title,
    heroAccent: raw.heroTitle ? raw.heroAccent || '' : d?.heroAccent || '',
    intro: raw.intro || d?.intro || raw.summary,
    usesHeadline: raw.usesHeadline || d?.usesHeadline || 'What we automate.',
    useCases: raw.useCases?.length ? raw.useCases : d?.useCases || [],
    included: raw.included?.length ? raw.included.map((i: Raw) => i.text) : DEFAULT_INCLUDED,
    process: DEFAULT_PROCESS,
    faqs: raw.faqs?.length ? raw.faqs : d?.faqs || GENERIC_FAQS,
    metaTitle: raw.metaTitle || d?.metaTitle || raw.title,
    metaDescription: raw.metaDescription || d?.metaDescription || raw.summary,
    related: (related?.length ? related : auto).map((s) => ({ title: s.title, slug: s.slug, icon: s.icon || 'spark' })),
  }
}

const defaults = () => DEFAULT_SERVICES.map((s, i) => ({ ...s, id: i + 1 })) as Raw[]

export const getAllServices = cache(async (): Promise<Raw[]> => {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'services', sort: 'order', limit: 100, depth: 1 })
    return res.docs.length ? (res.docs as Raw[]) : defaults()
  } catch {
    return defaults()
  }
})

export const getServicePage = cache(async (slug: string): Promise<ServicePage | null> => {
  const all = await getAllServices()
  const raw = all.find((s) => s.slug === slug)
  return raw ? toPage(raw, all) : null
})
