'use client'

import { useEffect, useState } from 'react'

/** "› AI that ___" line. Each phrase types itself in, then the next one replaces it. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (phrases.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let interval: ReturnType<typeof setInterval>
    const first = setTimeout(() => {
      setI((v) => v + 1)
      interval = setInterval(() => setI((v) => v + 1), 3000)
    }, 5600)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [phrases.length])

  const phrase = phrases[i % phrases.length] || ''
  const n = phrase.length
  return (
    <p className="hero-type fade" style={{ animationDelay: 'calc(var(--intro) + .8s)' }}>
      <span className="hero-type-prompt" aria-hidden="true">›</span> AI that{' '}
      <span
        key={i}
        className="type"
        style={{ width: `${n}ch`, animation: `typing ${n * 48}ms steps(${n}) ${i === 0 ? 'calc(var(--intro) + 0.95s)' : '0s'} both` }}
      >
        {phrase}
      </span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}
