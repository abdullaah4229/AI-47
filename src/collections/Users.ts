import type { CollectionConfig } from 'payload'

/** Admin accounts. Also used as blog authors (name, role, bio and photo appear on posts). */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Admin' },
  auth: {
    maxLoginAttempts: 5, // lock the account after 5 failed attempts
    lockTime: 15 * 60 * 1000, // for 15 minutes
    tokenExpiration: 8 * 60 * 60, // sessions last 8 hours
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', admin: { description: 'Shown as the author name on blog posts.' } },
    { name: 'jobTitle', type: 'text', label: 'Role', admin: { description: 'e.g. Founder' } },
    { name: 'bio', type: 'textarea', admin: { description: 'Short author bio shown at the end of posts.' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
  ],
}
