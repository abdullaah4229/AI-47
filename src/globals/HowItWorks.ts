import type { GlobalConfig } from 'payload'
import { DEFAULT_HOW as D } from '../content/pages'
import { revalidateSite } from './revalidate'

export const HowItWorks: GlobalConfig = {
  slug: 'how-it-works',
  label: 'How It Works page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'heroTitle', type: 'text', defaultValue: D.heroTitle },
        { name: 'heroAccent', type: 'text', defaultValue: D.heroAccent, admin: { description: 'Gradient part' } },
        { name: 'heroTitleEnd', type: 'text', defaultValue: D.heroTitleEnd },
      ],
    },
    { name: 'intro', type: 'textarea', defaultValue: D.intro },
    {
      name: 'steps',
      type: 'array',
      maxRows: 6,
      defaultValue: D.steps,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        { name: 'duration', type: 'text', admin: { description: 'Optional, e.g. "1–2 weeks". Hidden when empty.' } },
        { name: 'deliverables', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
      ],
    },
    { name: 'faqs', type: 'array', defaultValue: D.faqs, fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] },
    { name: 'metaTitle', type: 'text', defaultValue: D.metaTitle },
    { name: 'metaDescription', type: 'textarea', maxLength: 170, defaultValue: D.metaDescription },
  ],
}
