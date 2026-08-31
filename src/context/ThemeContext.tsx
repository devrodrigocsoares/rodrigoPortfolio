import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeMode } from '@/types'

export interface ThemeTransitionState {
  /** X position of the animation's origin (button center), in viewport pixels. */
  x: number
  /** Y position of the animation's origin (button center), in viewport pixels. */
  y: number
  /** Radius needed for a circle at (x, y) to fully cover the viewport. */
  maxRadius: number
  /** The theme that was active just before the toggle — this is what the
   *  shrinking overlay displays while it covers the screen. */
  outgoingTheme: ThemeMode
}

interface ThemeContextValue {
  theme: ThemeMode
  /** Flips the theme, animating a circular reveal centered on `originRect`. */
  toggleTheme: (originRect: DOMRect) => void
  transition: ThemeTransitionState | null
  /** Called by the overlay once its reveal animation finishes. */
  clearTransition: () => void
}

export const THEME_STORAGE_KEY = 'portfolio-theme'
const THEME_ORDER: ThemeMode[] = ['light', 'dark']

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function isThemeMode(value: string | null): value is ThemeMode {
  return value !== null && (THEME_ORDER as string[]).includes(value)
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  // The inline script in index.html already set this on <html> before React
  // mounted, so reading it back avoids a mismatch/flash on first render.
  const fromDocument = document.documentElement.getAttribute('data-theme')
  if (isThemeMode(fromDocument)) return fromDocument

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeMode(stored)) return stored
  } catch {
    // localStorage can throw in private-browsing/sandboxed contexts — fall back silently.
  }

  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)
  const [transition, setTransition] = useState<ThemeTransitionState | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore write failures (e.g. Safari private mode with storage disabled).
    }
  }, [theme])

  const toggleTheme = useCallback(
    (originRect: DOMRect) => {
      const x = originRect.left + originRect.width / 2
      const y = originRect.top + originRect.height / 2
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      const outgoingTheme = theme
      setTransition({ x, y, maxRadius, outgoingTheme })

      // Two rAFs guarantee the overlay (which exactly matches the current
      // view) has actually painted before we swap the real theme underneath
      // — otherwise the swap could flash through for a frame.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setThemeState(outgoingTheme === 'light' ? 'dark' : 'light')
        })
      })
    },
    [theme]
  )

  const clearTransition = useCallback(() => setTransition(null), [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, transition, clearTransition }),
    [theme, toggleTheme, transition, clearTransition]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
