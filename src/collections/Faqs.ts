import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../globals/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'order', 'showOnHome'], group: 'Content' },
  defaultSort: 'order',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'question', type: 'text', required: true },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: { description: 'Avoid guarantees about security, pricing, or timelines.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'showOnHome', type: 'checkbox', defaultValue: true, label: 'Show on homepage' },
      ],
    },
  ],
}
