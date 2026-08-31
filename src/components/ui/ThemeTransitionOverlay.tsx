import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Renders the full-viewport circular "reveal" when the theme is toggled.
 *
 * How it works: when the toggle fires, the real theme is swapped on
 * `<html>` almost immediately (see ThemeContext) — but it's swapped *under*
 * this overlay, which is a fixed layer painted with the OUTGOING theme's
 * background and initially clipped to a circle large enough to cover the
 * whole viewport. That circle then animates down to radius 0 at the
 * button's position, so as it shrinks, the new theme underneath is
 * progressively uncovered — spreading outward from the button, exactly like
 * the new theme is "born" there. Once the circle reaches 0, the overlay is
 * removed (there's nothing left to see — the real page already matches).
 */
export function ThemeTransitionOverlay() {
  const { transition, clearTransition } = useTheme()
  const prefersReducedMotion = usePrefersReducedMotion()

  // If the user prefers reduced motion, the theme has still swapped
  // underneath (that part isn't optional) — we just skip animating the
  // reveal and drop the overlay on the next tick instead of mid-render.
  useEffect(() => {
    if (transition && prefersReducedMotion) {
      clearTransition()
    }
  }, [transition, prefersReducedMotion, clearTransition])

  if (!transition || prefersReducedMotion) return null

  const { x, y, maxRadius, outgoingTheme } = transition

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[999] theme-reveal theme-reveal--${outgoingTheme}`}
      initial={{
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        WebkitClipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
      }}
      animate={{
        clipPath: `circle(0px at ${x}px ${y}px)`,
        WebkitClipPath: `circle(0px at ${x}px ${y}px)`,
      }}
      transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={clearTransition}
    />
  )
}
