# AI 742 Website — Milestones 6 & 7 (Lead capture, SEO & launch prep)

Next.js + Payload CMS + SQLite. The database is a single file on your own server: **no hosted database and no recurring database fees.**

## What's included

| Area | Status |
|---|---|
| Design system (colors, fonts, buttons, cards, animations) | Done — preview at `/design-system` |
| Navigation bar (sticky glass, rolling links, mobile menu, magnetic button) | Done |
| Footer (menus, social links, legal links) | Done |
| Motion layer (cursor glow, cursor ring, scroll progress, scroll reveal, card tilt) | Done — switches off for visitors who prefer reduced motion |
| Password-protected admin panel at `/admin` | Done — 5 failed logins locks the account for 15 minutes |
| Editable in admin: site settings, contact details, booking link, social links, SEO defaults, menus, images | Done |
| Branded "coming soon" page for URLs not built yet | Done |
| **Animated homepage** (intro, live neural network, typewriter, rising core, workflow demo, sample dashboard, FAQ, final call to action) | **Done — Milestone 2** |
| Homepage text, services, industries and FAQs editable in admin | **Done — Milestone 2** |
| Search engine data on the homepage (business details + FAQ for Google) | **Done — Milestone 2** |
| **`/services` overview and 11 service pages** (`/services/ai-consulting`, `/services/ai-receptionist`, …) | **Done — Milestone 3** |
| AI Receptionist page with sample call and comparison table | **Done — Milestone 3** |
| Per-page SEO title, description, breadcrumbs, and Google data (Service, FAQ, Breadcrumb) | **Done — Milestone 3** |
| **`/industries` explorer and 11 industry pages** (`/industries/law-firms`, `/industries/real-estate`, …) | **Done — Milestone 4** |
| **`/how-it-works`** and **`/about`** | **Done — Milestone 4** |
| Branded 404 page | **Done — Milestone 4** |
| **Blog**: `/blog`, posts at `/blog/[slug]`, category pages at `/blog/category/[slug]`, RSS feed at `/blog/rss.xml` | **Done — Milestone 5** |
| **Contact form** at `/contact` — saved to the database and emailed to you | **Done — Milestone 6** |
| **AI readiness assessment** at `/ai-readiness-assessment` — result + optional follow-up request | **Done — Milestone 6** |
| **Newsletter sign-up** on the blog | **Done — Milestone 6** |
| Spam protection (hidden trap field, speed check, rate limit), server-side validation | **Done — Milestone 6** |
| Leads export to a spreadsheet: `/api/leads/export` (logged-in admins only) | **Done — Milestone 6** |
| `/sitemap.xml`, `/robots.txt`, social sharing image, site icon, Google business data on every page | **Done — Milestone 7** |
| `/privacy-policy` and `/terms` (template outline until your attorney-reviewed text is added) | **Done — Milestone 7** |
| AI chatbot | Phase 4 |

## Run it on your computer

1. Install **Node.js 22** (or 20.9+) from nodejs.org.
2. Open a terminal in this folder and run:

```bash
npm install
cp .env.example .env          # Windows: copy .env.example .env
```

3. Open `.env` and replace `PAYLOAD_SECRET` with a long random string (any 40+ random characters).
4. Create the database and start the site:

```bash
npm run migrate
npm run seed      # adds the starting services, industries and FAQs (first time only)
npm run dev
```

5. Visit **http://localhost:3000** — then **http://localhost:3000/admin** to create your admin account.

## Upgrading from an earlier milestone

Replace the project files (keep your `.env`, `data/` and `media/` folders), then run:

```bash
npm install
npm run migrate   # adds the new database fields
npm run seed      # fills in starting content for new fields only — never overwrites your edits
```

## Email notifications (Gmail)

New leads are emailed to **abdullaah4229@gmail.com** (change `NOTIFY_EMAIL` in `.env` to use another address).
To let the website send through Gmail, create a Gmail **App Password** — your normal password will not work:

1. Google Account → **Security** → turn on **2-Step Verification**.
2. Google Account → **Security** → **App passwords** → create one named “AI 742 website”.
3. Paste the 16-character password into `.env` as `SMTP_PASS=` (no spaces) and restart the site.

Until `SMTP_PASS` is set, leads are still saved in the admin panel and the email is printed to the server log instead of being sent.

## Writing your first blog post

1. Admin → **Users** → your account: add your name, role, bio and photo.
2. Admin → **Blog → Posts** → open *Example post* to see how each part looks, then delete it.
3. **Create new**: title, excerpt, content (use *Heading 2* for sections), category, cover image.
4. Check the **SEO** tab, then press **Publish**.

## Editing content

In the admin panel:

| Menu | What you can change |
|---|---|
| Settings → Site Settings | Company name, footer text, contact email, phone, booking link, social profiles, default SEO title/description, sharing image |
| Settings → Menus | Main menu links, the header button, footer columns |
| Pages → Homepage | Every homepage heading and paragraph, the typewriter phrases, buttons, trust points, steps, benefits, about text |
| Content → Services | **Card** tab: title, description, icon, order. **Service page** tab: heading, intro, use cases, included list, questions, related services. **SEO** tab: Google title and description |
| Content → Industries | **Card** tab, **Industry page** tab (heading, intro, use cases, example workflow, compliance note, questions, related services), **SEO** tab |
| Pages → How It Works page | Heading, intro, the 4 steps with deliverables and optional durations, questions, SEO |
| Pages → About page | Heading, intro, mission, vision, beliefs, the “742” story, founder name/role/photo, SEO. The story and founder sections stay hidden until you fill them in. |
| Content → FAQs | Questions and answers (also sent to Google as FAQ data) |
| Blog → Posts | Write posts with headings, lists, links, quotes and images. Drafts stay private until you press **Publish**. Each post has an excerpt, cover image, category, tags, key takeaways, author and SEO tab. |
| Blog → Blog categories | Category names, web addresses and descriptions |
| Admin → Users | Your name, role, bio and photo — shown as the author on your posts |
| Leads → Leads | Every contact-form and assessment submission. Set a status (new, contacted, qualified, won, lost) and private notes. Export: open `/api/leads/export` while logged in. |
| Leads → Subscribers | Newsletter sign-ups |
| Pages → Legal pages | Privacy Policy and Terms text. Tick “An attorney has reviewed this content” to remove the review notice. |
| Content → Media | Upload images (automatically resized and converted to WebP) |

Changes appear on the website within seconds.

## Project structure

| Path | Purpose |
|---|---|
| `src/payload.config.ts` | CMS configuration (SQLite database, collections, settings) |
| `src/collections/` | Admin users and media library |
| `src/globals/` | Site settings and menus |
| `src/migrations/` | Database structure changes (run with `npm run migrate`) |
| `src/app/(frontend)/` | Public website pages and the design system CSS |
| `src/app/(payload)/` | Admin panel and API (standard Payload files) |
| `src/components/` | Header, footer, logo, motion layer |
| `deploy/` | VPS files: Nginx config, PM2 config, backup script |

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run migrate` | Apply database changes |
| `npm run seed` | Add starting content to an empty database (skips anything that exists) |
| `npm run migrate:create` | Record a database change after editing collections |
| `npm run generate:types` | Refresh TypeScript types after editing collections |

Deploying to your VPS: see **DEPLOY.md**.
