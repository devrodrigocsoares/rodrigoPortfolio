import type { Variants } from 'framer-motion'

/**
 * Single easing curve shared by every entrance animation on the site.
 * Fast start, soft landing, no overshoot — so nothing "wobbles" once it arrives.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * The site's one entrance: a short fade with a small rise.
 * `custom` is an optional delay in seconds (use it for a small stagger, ≤ ~0.2s total).
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  }),
}
