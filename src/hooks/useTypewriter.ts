import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  /** Milliseconds between each typed character. */
  typingSpeed?: number
  /** Milliseconds between each deleted character (usually faster than typing). */
  deletingSpeed?: number
  /** Milliseconds to hold the fully-typed word before deleting it. */
  pauseDuration?: number
  /** When true, skips the animation and just returns the first word as static text. */
  disabled?: boolean
}

/**
 * Cycles through `words`, typing and deleting each one in turn.
 * Returns the text currently visible and whether the "cursor" should blink
 * (i.e. whether we're paused between typing/deleting, for a steadier blink).
 */
export function useTypewriter(words: string[], options: UseTypewriterOptions = {}) {
  const { typingSpeed = 70, deletingSpeed = 35, pauseDuration = 1400, disabled = false } = options

  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(disabled ? words[0] ?? '' : '')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    if (disabled || words.length === 0) {
      setDisplayText(words[0] ?? '')
      return
    }

    const currentWord = words[wordIndex % words.length]

    if (phase === 'typing') {
      if (displayText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      }
      const timeout = setTimeout(() => setPhase('pausing'), pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (phase === 'pausing') {
      const timeout = setTimeout(() => setPhase('deleting'), pauseDuration)
      return () => clearTimeout(timeout)
    }

    // phase === 'deleting'
    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, deletingSpeed)
      return () => clearTimeout(timeout)
    }

    setWordIndex((index) => (index + 1) % words.length)
    setPhase('typing')
  }, [displayText, phase, wordIndex, words, disabled, typingSpeed, deletingSpeed, pauseDuration])

 return {
  text: displayText,
  textDev: displayText,
  isPausing: phase === 'pausing',
}
}
