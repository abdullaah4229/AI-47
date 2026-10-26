'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated neural network behind the hero: drifting nodes, links between nearby nodes,
 * light pulses along links, and a pull toward the cursor. Pauses when off-screen
 * and draws a single still frame for visitors who prefer reduced motion.
 */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cols = ['0,229,255', '59,130,246', '139,92,246']
    const LINK = 132
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string }
    let W = 0, H = 0, pts: P[] = [], pulses: { a: number; b: number; t: number }[] = []
    let mouse: { x: number; y: number } | null = null
    let visible = true
    let raf = 0

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = c.clientWidth
      H = c.clientHeight
      c.width = Math.max(1, Math.round(W * dpr))
      c.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(36, Math.min(150, Math.floor((W * H) / 9500)))
      pts = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H * 0.85,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.5 + 0.6, c: cols[i % 3],
      }))
      pulses = []
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (!reduce) {
        for (const p of pts) {
          p.x += p.vx
          p.y += p.vy
          if (mouse) {
            const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy)
            if (d < 220 && d > 24) { p.x += (dx / d) * 0.32; p.y += (dy / d) * 0.32 }
          }
          if (p.x < 0 || p.x > W) p.vx *= -1
          if (p.y < 0 || p.y > H * 0.9) p.vy *= -1
          p.x = Math.max(0, Math.min(W, p.x))
          p.y = Math.max(0, Math.min(H * 0.9, p.y))
        }
      }
      ctx.lineWidth = 0.7
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${a.c},${((1 - d / LINK) * 0.26).toFixed(3)})`
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      if (mouse && mouse.y > -50 && mouse.y < H) {
        ctx.lineWidth = 0.9
        for (const p of pts) {
          const d = Math.hypot(mouse.x - p.x, mouse.y - p.y)
          if (d < 190) {
            ctx.strokeStyle = `rgba(0,229,255,${((1 - d / 190) * 0.7).toFixed(3)})`
            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y); ctx.stroke()
          }
        }
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        g.addColorStop(0, 'rgba(0,229,255,.18)'); g.addColorStop(1, 'rgba(0,229,255,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2); ctx.fill()
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${p.c},.95)`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce) {
        if (Math.random() < 0.08 && pulses.length < 16) {
          const i = Math.floor(Math.random() * pts.length)
          const j = pts.findIndex((q, k) => k !== i && Math.hypot(pts[i].x - q.x, pts[i].y - q.y) < LINK)
          if (j >= 0) pulses.push({ a: i, b: j, t: 0 })
        }
        ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 14; ctx.fillStyle = '#E0FBFF'
        pulses = pulses.filter((pl) => {
          pl.t += 0.025
          const A = pts[pl.a], B = pts[pl.b]
          if (!A || !B || pl.t > 1) return false
          ctx.beginPath(); ctx.arc(A.x + (B.x - A.x) * pl.t, A.y + (B.y - A.y) * pl.t, 1.9, 0, Math.PI * 2); ctx.fill()
          return true
        })
        ctx.shadowBlur = 0
      }
    }

    size()
    draw()
    const ro = new ResizeObserver(() => { size(); draw() })
    ro.observe(c)
    if (reduce) return () => ro.disconnect()

    const onMove = (e: PointerEvent) => {
      const b = c.getBoundingClientRect()
      mouse = { x: e.clientX - b.left, y: e.clientY - b.top }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(c)
    const loop = () => { if (visible && !document.hidden) draw(); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
