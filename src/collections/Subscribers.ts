import type { CollectionConfig } from 'payload'

/** Newsletter sign-ups from the blog. */
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'source', 'createdAt'], group: 'Leads' },
  defaultSort: '-createdAt',
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'source', type: 'text', admin: { readOnly: true } },
    { name: 'unsubscribed', type: 'checkbox', defaultValue: false },
  ],
}
