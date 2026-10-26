import type { CollectionConfig } from 'payload'
import { ICON_OPTIONS } from '../content/icons'
import { revalidateAfterChange, revalidateAfterDelete } from '../globals/revalidate'

/** Each service has a card (homepage, /services) and its own page at /services/[slug]. */
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'showOnHome'],
    group: 'Content',
    preview: (doc) => `/services/${doc?.slug ?? ''}`,
  },
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
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: { description: 'Web address: /services/[slug]. Lowercase words joined with hyphens.' },
            },
            { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two sentences shown on cards.' } },
            { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'spark' },
            {
              type: 'row',
              fields: [
                { name: 'order', type: 'number', defaultValue: 0, admin: { description: 'Lower numbers appear first.' } },
                { name: 'showOnHome', type: 'checkbox', defaultValue: true, label: 'Show on homepage' },
              ],
            },
          ],
        },
        {
          label: 'Service page',
          fields: [
            {
              name: 'template',
              type: 'select',
              defaultValue: 'standard',
              options: [
                { label: 'Standard service page', value: 'standard' },
                { label: 'AI Receptionist (sample call + comparison table)', value: 'receptionist' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'heroTitle', type: 'text', admin: { description: 'Main heading (H1). Leave empty to use the card title.' } },
                { name: 'heroAccent', type: 'text', admin: { description: 'Second part of the heading, shown with the gradient.' } },
              ],
            },
            { name: 'intro', type: 'textarea', admin: { description: 'Paragraph under the heading.' } },
            { name: 'usesHeadline', type: 'text', label: 'Use cases heading' },
            {
              name: 'useCases',
              type: 'array',
              maxRows: 8,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'included',
              type: 'array',
              label: '"What’s included" list',
              admin: { description: 'Leave empty to use the standard list.' },
              maxRows: 10,
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'Questions about this service',
              admin: { description: 'Leave empty to use the standard three questions.' },
              maxRows: 8,
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
            {
              name: 'related',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              maxRows: 3,
              label: '"Pairs well with" services',
              admin: { description: 'Leave empty to show the next services automatically.' },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Browser tab and Google title. " | AI 742" is added automatically.' } },
            { name: 'metaDescription', type: 'textarea', maxLength: 170, admin: { description: 'Shown under the title in Google results (about 150–160 characters).' } },
          ],
        },
      ],
    },
  ],
}
