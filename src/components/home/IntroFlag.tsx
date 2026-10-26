'use client'

import { useEffect } from 'react'

/** After the intro has played once, skip it on later visits to the homepage (client-side navigation). */
export function IntroFlag() {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add('intro-seen'), 2300)
    return () => clearTimeout(t)
  }, [])
  return null
}
