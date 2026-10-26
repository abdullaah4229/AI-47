import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

export type NavLink = { label: string; href: string }
export type FooterColumn = { title: string; links: NavLink[] }

export type SiteData = {
  siteName: string
  footerDescription: string
  contactEmail?: string
  phone?: string
  bookingUrl?: string
  social: { label: string; href: string }[]
  defaultTitle: string
  defaultDescription: string
  mainMenu: NavLink[]
  ctaLabel: string
  ctaHref: string
  footerColumns: FooterColumn[]
}

/** Used when the database is empty or not reachable (e.g. during the first build). */
export const DEFAULTS: SiteData = {
  siteName: 'AI 742',
  footerDescription: 'AI automation and consulting for growing businesses across the United States.',
  social: [],
  defaultTitle: 'AI Automation Agency & AI Consulting for Small Businesses | AI 742',
  defaultDescription:
    'AI 742 is an AI automation agency and AI consultant for small businesses in the US — AI receptionists, chatbots, voice agents, and workflow automation.',
  mainMenu: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaLabel: 'Book Free Consultation',
  ctaHref: '/contact',
  footerColumns: [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Industries', href: '/industries' },
        { label: 'Free AI Assessment', href: '/ai-readiness-assessment' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'AI Receptionist', href: '/services/ai-receptionist' },
        { label: 'AI Automation', href: '/services/ai-automation' },
        { label: 'AI Chatbots', href: '/services/ai-chatbots' },
        { label: 'AI Voice Agents', href: '/services/ai-voice-agents' },
        { label: 'AI Consulting', href: '/services/ai-consulting' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { label: 'AI for Law Firms', href: '/industries/law-firms' },
        { label: 'AI for Real Estate', href: '/industries/real-estate' },
        { label: 'All Industries', href: '/industries' },
      ],
    },
  ],
}

const clean = (links?: { label?: string | null; href?: string | null }[] | null): NavLink[] =>
  (links || []).filter((l) => l?.label && l?.href).map((l) => ({ label: l.label as string, href: l.href as string }))

export const getSiteData = cache(async (): Promise<SiteData> => {
  try {
    const payload = await getPayload({ config })
    const [s, n] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 0 }),
      payload.findGlobal({ slug: 'navigation', depth: 0 }),
    ])
    const social = (
      [
        ['LinkedIn', s.linkedin],
        ['YouTube', s.youtube],
        ['Instagram', s.instagram],
        ['Facebook', s.facebook],
      ] as const
    )
      .filter(([, href]) => Boolean(href))
      .map(([label, href]) => ({ label, href: href as string }))

    const mainMenu = clean(n.mainMenu)
    const footerColumns = (n.footerColumns || [])
      .map((c) => ({ title: c.title, links: clean(c.links) }))
      .filter((c) => c.title && c.links.length)

    return {
      siteName: s.siteName || DEFAULTS.siteName,
      footerDescription: s.footerDescription || DEFAULTS.footerDescription,
      contactEmail: s.contactEmail || undefined,
      phone: s.phone || undefined,
      bookingUrl: s.bookingUrl || undefined,
      social,
      defaultTitle: s.defaultTitle || DEFAULTS.defaultTitle,
      defaultDescription: s.defaultDescription || DEFAULTS.defaultDescription,
      mainMenu: mainMenu.length ? mainMenu : DEFAULTS.mainMenu,
      ctaLabel: n.ctaLabel || DEFAULTS.ctaLabel,
      ctaHref: n.ctaHref || DEFAULTS.ctaHref,
      footerColumns: footerColumns.length ? footerColumns : DEFAULTS.footerColumns,
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.warn('[AI 742] Using default site settings:', err)
    return DEFAULTS
  }
})
