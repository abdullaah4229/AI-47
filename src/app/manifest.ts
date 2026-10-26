import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'AI 742', short_name: 'AI 742', description: 'AI automation agency and AI consulting for small businesses.', start_url: '/', display: 'standalone', background_color: '#050505', theme_color: '#050505', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] }
}
