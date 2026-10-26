'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import type { NavLink } from '@/lib/site'

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

export function Header({ menu, ctaLabel, ctaHref }: { menu: NavLink[]; ctaLabel: string; ctaHref: string }) {
  const pathname = usePathname() || '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation and with the Escape key.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <nav aria-label="Primary" className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <Link href="/" aria-label="AI 742 home" className="nav-logo">
          <Logo />
        </Link>

        <ul className="nav-links">
          {menu.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link href={item.href} className="navlink" aria-current={active ? 'page' : undefined}>
                  <span className="roll" data-text={item.label}>
                    <span>{item.label}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-actions">
          <Link href={ctaHref} className="btn btn-primary btn-sm magnetic nav-cta">
            {ctaLabel}
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h10'} />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <ul>
            {menu.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="mlink" aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                  {item.label}
                  <span className="mono-small">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={ctaHref} className="btn btn-primary btn-block">
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  )
}
