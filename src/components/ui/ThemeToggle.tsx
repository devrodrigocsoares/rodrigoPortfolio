import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  className?: string
}

/**
 * A single, simple button that flips between light and dark mode.
 * The interesting animation isn't here — clicking it hands the button's
 * screen position off to <ThemeTransitionOverlay />, which does the actual
 * circular reveal across the whole page. This button only cross-fades its
 * own sun/moon icon.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isDark = theme === 'dark'

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) toggleTheme(rect)
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full
        border border-line bg-surface text-ink transition-colors duration-200
        hover:border-ink/30 focus-visible:outline-offset-2 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={17} aria-hidden="true" />
          ) : (
            <Sun size={17} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
