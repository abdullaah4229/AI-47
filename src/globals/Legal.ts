import type { GlobalConfig } from 'payload'
import { revalidateSite } from './revalidate'

/** Privacy Policy and Terms of Service. Until content is added, a template outline is shown with a review notice. */
export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Legal pages',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'reviewed',
      type: 'checkbox',
      label: 'An attorney has reviewed this content',
      admin: { description: 'While unchecked, both pages show a "requires legal review" notice.' },
    },
    { name: 'lastUpdated', type: 'date' },
    {
      type: 'tabs',
      tabs: [
        { label: 'Privacy Policy', fields: [{ name: 'privacy', type: 'richText', admin: { description: 'Leave empty to show the template outline.' } }] },
        { label: 'Terms of Service', fields: [{ name: 'terms', type: 'richText', admin: { description: 'Leave empty to show the template outline.' } }] },
      ],
    },
  ],
}
