import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'light' | 'dark'
}

export function Badge({ children, tone = 'light' }: BadgeProps) {
  const toneClass =
    tone === 'dark'
      ? 'bg-white/10 text-white border-white/15'
      : 'bg-accent-soft text-accent-dim border-accent/15'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono ${toneClass}`}
    >
      {children}
    </span>
  )
}
