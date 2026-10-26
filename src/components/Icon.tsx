import { ICONS, type IconName } from '@/content/icons'

export function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.6,
  draw = false,
}: {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
  draw?: boolean
}) {
  const d = ICONS[(name in ICONS ? name : 'spark') as IconName]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} pathLength={draw ? 1 : undefined} />
    </svg>
  )
}

export const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
