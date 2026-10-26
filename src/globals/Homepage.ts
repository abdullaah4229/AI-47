import type { Field, GlobalConfig } from 'payload'
import { DEFAULT_HOME as D } from '../content/defaults'
import { ICON_OPTIONS } from '../content/icons'
import { revalidateSite } from './revalidate'

/** A heading split into a plain part and a gradient-highlighted part. */
const heading = (def: { title: string; accent: string }): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'title', type: 'text', required: true, defaultValue: def.title },
      { name: 'accent', type: 'text', defaultValue: def.accent, admin: { description: 'Shown with the gradient.' } },
    ],
  },
]
const textItems = (def: { title: string; text: string }[], max: number): Field => ({
  name: 'items',
  type: 'array',
  maxRows: max,
  defaultValue: def,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
})

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            { name: 'badge', type: 'text', defaultValue: D.hero.badge, admin: { description: 'Main SEO heading (H1), shown as the small glowing badge.' } },
            { name: 'line1', type: 'text', defaultValue: D.hero.line1 },
            { name: 'line2', type: 'text', defaultValue: D.hero.line2 },
            { name: 'line3', type: 'text', defaultValue: D.hero.line3, admin: { description: 'Gradient line.' } },
            {
              name: 'phrases',
              type: 'array',
              label: 'Typewriter phrases ("AI that …")',
              maxRows: 8,
              defaultValue: D.hero.phrases,
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'subheadline', type: 'textarea', defaultValue: D.hero.subheadline },
            {
              type: 'row',
              fields: [
                { name: 'primaryLabel', type: 'text', defaultValue: D.hero.primaryLabel },
                { name: 'primaryHref', type: 'text', defaultValue: D.hero.primaryHref },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'secondaryLabel', type: 'text', defaultValue: D.hero.secondaryLabel },
                { name: 'secondaryHref', type: 'text', defaultValue: D.hero.secondaryHref },
              ],
            },
          ],
        },
        {
          label: 'Trust',
          name: 'trust',
          fields: [
            ...heading(D.trust),
            { name: 'intro', type: 'textarea', defaultValue: D.trust.intro },
            {
              name: 'items',
              type: 'array',
              maxRows: 6,
              defaultValue: D.trust.items,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'text', required: true },
                { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'spark' },
              ],
            },
          ],
        },
        {
          label: 'Services',
          name: 'services',
          description: 'The service cards come from Content → Services (those marked "Show on homepage").',
          fields: [...heading(D.services), { name: 'intro', type: 'textarea', defaultValue: D.services.intro }],
        },
        {
          label: 'Why AI 742',
          name: 'why',
          fields: [...heading(D.why), { name: 'intro', type: 'textarea', defaultValue: D.why.intro }, textItems(D.why.items, 8)],
        },
        { label: 'How It Works', name: 'steps', fields: [...heading(D.steps), textItems(D.steps.items, 6)] },
        { label: 'Benefits', name: 'benefits', fields: [...heading(D.benefits), textItems(D.benefits.items, 6)] },
        {
          label: 'About',
          name: 'about',
          fields: [
            ...heading(D.about),
            { name: 'paragraphs', type: 'array', maxRows: 5, defaultValue: D.about.paragraphs, fields: [{ name: 'text', type: 'textarea', required: true }] },
          ],
        },
        {
          label: 'Final call to action',
          name: 'finalCta',
          fields: [
            ...heading(D.finalCta),
            { name: 'text', type: 'textarea', defaultValue: D.finalCta.text },
            {
              type: 'row',
              fields: [
                { name: 'buttonLabel', type: 'text', defaultValue: D.finalCta.buttonLabel },
                { name: 'buttonHref', type: 'text', defaultValue: D.finalCta.buttonHref },
              ],
            },
          ],
        },
      ],
    },
  ],
}
