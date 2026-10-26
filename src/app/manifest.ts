import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
// Set for the GitHub Pages build, where the site lives under /<repo-name>/
const BASE = process.env.PAGES_BASE_PATH || ''

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'AI 742', short_name: 'AI 742', description: 'AI automation agency and AI consulting for small businesses.', start_url: `${BASE}/`, display: 'standalone', background_color: '#050505', theme_color: '#050505', icons: [{ src: `${BASE}/icon.svg`, sizes: 'any', type: 'image/svg+xml' }] }
}
