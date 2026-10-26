import type { GlobalConfig } from 'payload'
import { DEFAULT_ABOUT as D } from '../content/pages'
import { revalidateSite } from './revalidate'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Intro',
          fields: [
            { type: 'row', fields: [{ name: 'heroTitle', type: 'text', defaultValue: D.heroTitle }, { name: 'heroAccent', type: 'text', defaultValue: D.heroAccent }] },
            { name: 'intro', type: 'textarea', defaultValue: D.intro },
            { name: 'mission', type: 'textarea', defaultValue: D.mission },
            { name: 'vision', type: 'textarea', defaultValue: D.vision },
            { name: 'beliefs', type: 'array', maxRows: 6, defaultValue: D.beliefs, fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea', required: true }] },
          ],
        },
        {
          label: 'Story & founder',
          description: 'The story and founder sections only appear once you fill them in.',
          fields: [
            { name: 'storyTitle', type: 'text', defaultValue: D.storyTitle },
            { name: 'story', type: 'textarea', admin: { description: 'The story behind the name “742”.' } },
            { name: 'storyMore', type: 'textarea', defaultValue: D.storyMore },
            { type: 'row', fields: [{ name: 'founderName', type: 'text' }, { name: 'founderRole', type: 'text', defaultValue: D.founderRole }] },
            { name: 'founderPhoto', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: D.metaTitle },
            { name: 'metaDescription', type: 'textarea', maxLength: 170, defaultValue: D.metaDescription },
          ],
        },
      ],
    },
  ],
}
