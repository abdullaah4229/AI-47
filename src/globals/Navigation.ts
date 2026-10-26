import type { Field, GlobalConfig } from 'payload'
import { revalidateSite } from './revalidate'

const link: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'href', type: 'text', required: true, admin: { description: 'e.g. /services or https://…' } },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menus',
  admin: { group: 'Settings' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Main menu',
      maxRows: 8,
      fields: link,
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Industries', href: '/industries' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', defaultValue: 'Book Free Consultation' },
        { name: 'ctaHref', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: link },
      ],
    },
  ],
}
