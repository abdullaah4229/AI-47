import { withPayload } from '@payloadcms/next/withPayload'

// Set by scripts/build-static.mjs for the GitHub Pages build (plain HTML files, no server)
const isStatic = process.env.STATIC_EXPORT === '1'

/** @type {import('next').NextConfig} */
const serverConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

/** @type {import('next').NextConfig} */
const staticConfig = {
  output: 'export',
  // GitHub Pages serves project sites from /<repo-name>/
  basePath: process.env.PAGES_BASE_PATH || '',
  trailingSlash: true,
  images: { unoptimized: true },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Branded 404 page for unknown addresses (the site and admin have separate root layouts)
  experimental: { globalNotFound: true },
  ...(isStatic ? staticConfig : serverConfig),
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
