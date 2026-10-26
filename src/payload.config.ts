import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { Faqs } from './collections/Faqs'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Leads } from './collections/Leads'
import { Subscribers } from './collections/Subscribers'
import { Legal } from './globals/Legal'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Homepage } from './globals/Homepage'
import { HowItWorks } from './globals/HowItWorks'
import { About } from './globals/About'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === 'production') {
  // Fail loudly rather than run the admin panel with an empty secret.
  console.warn('[AI 742] PAYLOAD_SECRET is not set. Copy .env.example to .env and set it.')
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — AI 742 Admin' },
  },
  collections: [Leads, Subscribers, Posts, Categories, Services, Industries, Faqs, Media, Users],
  globals: [Homepage, HowItWorks, About, Legal, SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./data/ai742.db' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes always go through migrations (npm run migrate), in development and production.
    push: false,
  }),
  sharp,
  // Email via your own SMTP account (e.g. Gmail with an App Password). Without SMTP settings, emails are printed to the server log.
  ...(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER,
          defaultFromName: 'AI 742 Website',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 465),
            secure: Number(process.env.SMTP_PORT || 465) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          },
        }),
      }
    : {}),
})
