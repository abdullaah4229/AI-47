'use client'

import { useState } from 'react'

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }
  return (
    <div className="share" aria-label="Share this post">
      <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 9h4v11H4z M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M12 9h4v2c.6-1.2 2-2.2 3.6-2.2 2.4 0 3.4 1.6 3.4 4.2v7h-4v-6c0-1.4-.6-2.2-1.8-2.2-1.3 0-2.2.9-2.2 2.4V20h-3z" /></svg>
      </a>
      <a className="share-btn" href={`https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" /></svg>
      </a>
      <button type="button" className="share-btn" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'}>
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1 M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" /></svg>
        )}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </div>
  )
}
