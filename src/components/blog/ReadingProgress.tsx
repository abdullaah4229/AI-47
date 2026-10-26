'use client'

import { useEffect, useState } from 'react'

/** Thin bar at the top that fills as the reader moves through the article. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [targetId])
  return <div className="read-progress" aria-hidden="true"><span style={{ transform: `scaleX(${p})` }} /></div>
}
