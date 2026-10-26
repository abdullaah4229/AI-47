import type { CollectionConfig } from 'payload'
import { ICON_OPTIONS } from '../content/icons'
import { revalidateAfterChange, revalidateAfterDelete } from '../globals/revalidate'

/** Each industry has a card and its own page at /industries/[slug]. */
export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'order', 'showOnHome'], group: 'Content', preview: (doc) => `/industries/${doc?.slug ?? ''}` },
  defaultSort: 'order',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Web address: /industries/[slug]' } },
            { name: 'opportunities', type: 'text', admin: { description: 'Short list, e.g. "Reservations · Reviews · Phone orders"' } },
            { name: 'summary', type: 'textarea', required: true },
            { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'brief' },
            {
              type: 'row',
              fields: [
                { name: 'order', type: 'number', defaultValue: 0 },
                { name: 'showOnHome', type: 'checkbox', defaultValue: true, label: 'Show on homepage' },
              ],
            },
          ],
        },
        {
          label: 'Industry page',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'heroTitle', type: 'text', admin: { description: 'Main heading (H1), e.g. "AI for"' } },
                { name: 'heroAccent', type: 'text', admin: { description: 'Gradient part, e.g. "Law Firms."' } },
              ],
            },
            { name: 'intro', type: 'textarea' },
            { name: 'useCases', type: 'array', maxRows: 8, fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea', required: true }] },
            { name: 'flow', type: 'array', label: 'Example workflow (3 steps)', maxRows: 4, fields: [{ name: 'text', type: 'text', required: true }] },
            { name: 'note', type: 'textarea', label: 'Oversight / compliance note', admin: { description: 'Shown as a highlighted notice. Leave empty to hide.' } },
            { name: 'faqs', type: 'array', maxRows: 8, admin: { description: 'Leave empty to use the standard three questions.' }, fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] },
            { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true, maxRows: 3 },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea', maxLength: 170 },
          ],
        },
      ],
    },
  ],
}
