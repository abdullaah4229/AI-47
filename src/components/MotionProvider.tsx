'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Site-wide motion layer:
 *  - cursor glow + cursor ring + scroll progress bar
 *  - scroll reveal for any element with class "reveal"
 *  - spotlight border / 3D tilt on ".spot" and ".card" elements
 *  - magnetic pull on ".magnetic" buttons
 * Everything is disabled when the visitor prefers reduced motion.
 */
export function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      const max = html.scrollHeight - window.innerHeight
      html.style.setProperty('--sp', (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0).toFixed(2) + '%')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    let last: PointerEvent | null = null
    let lastCard: HTMLElement | null = null
    let lastMag: HTMLElement | null = null

    const handle = () => {
      raf = 0
      const e = last
      if (!e) return
      html.style.setProperty('--mx', e.clientX + 'px')
      html.style.setProperty('--my', e.clientY + 'px')
      html.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      html.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))

      const target = e.target instanceof Element ? e.target : null
      const card = target?.closest<HTMLElement>('.spot') ?? null
      if (lastCard && lastCard !== card) {
        lastCard.style.setProperty('--rx', '0deg')
        lastCard.style.setProperty('--ry', '0deg')
      }
      lastCard = card
      if (card) {
        const b = card.getBoundingClientRect()
        const x = e.clientX - b.left
        const y = e.clientY - b.top
        card.style.setProperty('--x', x + 'px')
        card.style.setProperty('--y', y + 'px')
        if (card.classList.contains('card')) {
          card.style.setProperty('--rx', ((y / b.height - 0.5) * -8).toFixed(2) + 'deg')
          card.style.setProperty('--ry', ((x / b.width - 0.5) * 8).toFixed(2) + 'deg')
        }
      }

      const mag = target?.closest<HTMLElement>('.magnetic') ?? null
      if (lastMag && lastMag !== mag) {
        lastMag.style.setProperty('--tx', '0px')
        lastMag.style.setProperty('--ty', '0px')
      }
      lastMag = mag
      if (mag) {
        const b = mag.getBoundingClientRect()
        mag.style.setProperty('--tx', ((e.clientX - (b.left + b.width / 2)) * 0.28).toFixed(1) + 'px')
        mag.style.setProperty('--ty', ((e.clientY - (b.top + b.height / 2)) * 0.38).toFixed(1) + 'px')
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      last = e
      if (!raf) raf = requestAnimationFrame(handle)
    }
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll reveal — re-scanned on every page change.
  useEffect(() => {
    const html = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      html.classList.remove('js-reveal')
      return
    }
    html.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return (
    <>
      <div className="sprog" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="cring" aria-hidden="true" />
    </>
  )
}
