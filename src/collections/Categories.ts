import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../globals/revalidate'

/** Blog categories. Each has its own page at /blog/category/[slug]. */
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Blog category', plural: 'Blog categories' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'order'], group: 'Blog' },
  defaultSort: 'order',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Web address: /blog/category/[slug]' } },
    { name: 'description', type: 'textarea', admin: { description: 'Shown at the top of the category page and in Google.' } },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
