import { useId } from 'react'

/** AI 742 mark: three connected nodes inside a rounded tile, plus wordmark. */
export function Logo({ size = 36, wordmark = true }: { size?: number; wordmark?: boolean }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
        <defs>
          <linearGradient id={`lg${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563EB" />
            <stop offset=".5" stopColor="#00E5FF" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="34" height="34" rx="10" fill="#080D1A" stroke={`url(#lg${id})`} strokeWidth="1.5" />
        <path d="M11 25 L18 11 L25 25 Z" fill="none" stroke={`url(#lg${id})`} strokeWidth="1.4" />
        <circle cx="18" cy="11" r="2.6" fill="#00E5FF" />
        <circle cx="11" cy="25" r="2.6" fill="#2563EB" />
        <circle cx="25" cy="25" r="2.6" fill="#8B5CF6" />
        <circle cx="18" cy="20.3" r="1.6" fill="#fff" />
      </svg>
      {wordmark && (
        <span className="logo-word">
          AI<span>742</span>
        </span>
      )}
    </span>
  )
}
