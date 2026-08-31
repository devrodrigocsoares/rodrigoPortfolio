/**
 * ProjectsError Component
 * Displays a friendly error message when GitHub API fails
 * Provides a retry button for user to manually retry
 */

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProjectsErrorProps {
  error: Error | null
  onRetry: () => void
}

/**
 * Renders error state with retry action
 * Error details are logged internally; user sees friendly message
 */
export function ProjectsError({ error, onRetry }: ProjectsErrorProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-line bg-surface p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <AlertCircle className="h-8 w-8 text-accent" aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-ink sm:text-2xl">
          Unable to load projects
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          There was an issue connecting to GitHub. Please try again or come back later.
        </p>
      </div>

      <Button
        onClick={onRetry}
        variant="default"
        className="mt-2"
        aria-label="Retry loading projects"
      >
        Try again
      </Button>

      {/* Hidden error details for debugging (shown in console) */}
      {error && (
        <p className="text-xs text-muted-light">
          Error: {error.message}
        </p>
      )}
    </div>
  )
}
