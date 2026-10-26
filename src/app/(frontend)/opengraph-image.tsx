import { ImageResponse } from 'next/og'

/** Default social sharing image (1200×630) used when a page has no image of its own. */
export const alt = 'AI 742 — AI Automation Agency & AI Consulting for Small Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'radial-gradient(circle at 80% 20%, rgba(37,99,235,.55), transparent 50%), radial-gradient(circle at 10% 90%, rgba(139,92,246,.45), transparent 50%), #050505', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, border: '2px solid #00E5FF', background: '#080D1A', display: 'flex', alignItems: 'center', justifyContent: 'center', }}><div style={{ width: 20, height: 20, background: '#00E5FF', transform: 'rotate(45deg)', borderRadius: 3 }} /></div>
          <div style={{ fontSize: 40, fontWeight: 700, display: 'flex' }}>AI<span style={{ color: '#00E5FF', marginLeft: 10 }}>742</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>Your Business.</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: '#67E8F9' }}>Powered by Artificial Intelligence.</div>
        </div>
        <div style={{ fontSize: 26, color: '#A1A1AA', display: 'flex' }}>AI Automation Agency &amp; AI Consulting for Small Businesses</div>
      </div>
    ),
    size,
  )
}
