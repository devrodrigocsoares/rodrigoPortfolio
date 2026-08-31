import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` OS setting so components can
 * disable non-essential motion (per WCAG 2.3.3).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return prefersReduced
}
