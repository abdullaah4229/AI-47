import type { GlobalConfig } from 'payload'
import { revalidateSite } from './revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'AI 742', required: true },
            {
              name: 'footerDescription',
              type: 'textarea',
              defaultValue: 'AI automation and consulting for growing businesses across the United States.',
            },
            { name: 'contactEmail', type: 'email', admin: { description: 'Shown on the Contact page and footer.' } },
            { name: 'phone', type: 'text' },
            {
              name: 'bookingUrl',
              type: 'text',
              admin: { description: 'Calendar booking link (e.g. Calendly). Leave empty to hide booking buttons.' },
            },
          ],
        },
        {
          label: 'Social',
          description: 'Only filled-in profiles appear on the website.',
          fields: [
            { name: 'linkedin', type: 'text' },
            { name: 'youtube', type: 'text' },
            { name: 'instagram', type: 'text' },
            { name: 'facebook', type: 'text' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              defaultValue: 'AI Automation Agency & AI Consulting for Small Businesses | AI 742',
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              maxLength: 170,
              defaultValue:
                'AI 742 is an AI automation agency and AI consultant for small businesses in the US — AI receptionists, chatbots, voice agents, and workflow automation.',
            },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Social sharing image' },
          ],
        },
      ],
    },
  ],
}
