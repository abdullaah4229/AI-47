import type { CollectionConfig, FieldHook } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../globals/revalidate'

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’'"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

const autoSlug: FieldHook = ({ value, data }) => (value ? slugify(String(value)) : data?.title ? slugify(String(data.title)) : value)

/** Blog posts. Drafts are private; only published posts appear on the website. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'publishedAt'],
    group: 'Blog',
    preview: (doc) => `/blog/${doc?.slug ?? ''}`,
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
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
          label: 'Post',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'excerpt', type: 'textarea', required: true, maxLength: 300, admin: { description: 'One or two sentences. Shown under the title, on cards, and in Google if no SEO description is set.' } },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', required: true, admin: { description: 'Use Heading 2 and Heading 3 for sections — they build the “On this page” menu. Quotes become large pull quotes.' } },
            {
              name: 'keyTakeaways',
              type: 'array',
              label: 'Key takeaways',
              maxRows: 6,
              admin: { description: 'Optional summary box at the end of the post.' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Leave empty to use the post title. " | AI 742" is added automatically.' } },
            { name: 'metaDescription', type: 'textarea', maxLength: 170, admin: { description: 'Leave empty to use the excerpt.' } },
          ],
        },
      ],
    },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { position: 'sidebar', description: 'Web address: /blog/[slug]. Created from the title if left empty.' }, hooks: { beforeValidate: [autoSlug] } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } }, defaultValue: () => new Date().toISOString() },
    { name: 'category', type: 'relationship', relationTo: 'categories', admin: { position: 'sidebar' } },
    { name: 'tags', type: 'array', admin: { position: 'sidebar' }, maxRows: 8, fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', label: 'Feature at the top of the blog', admin: { position: 'sidebar' } },
  ],
}
