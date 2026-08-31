/**
 * useGithubProjects Hook
 * Fetches and manages GitHub projects for the portfolio
 * Handles loading, error, and success states
 */

import { useEffect, useState } from 'react'
import { Project } from '@/types'
import { getGitHubProjects } from '@/services/github'

export interface UseGithubProjectsState {
  data: Project[]
  isLoading: boolean
  error: Error | null
  retry: () => void
}

/**
 * Custom hook to fetch GitHub projects
 * Respects prefers-reduced-motion for animations
 *
 * @example
 * const { data, isLoading, error } = useGithubProjects()
 *
 * if (isLoading) return <ProjectSkeleton />
 * if (error) return <ProjectsError />
 * return data.map(project => <ProjectCard key={project.id} project={project} />)
 */
export function useGithubProjects(): UseGithubProjectsState {
  const [data, setData] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const projects = await getGitHubProjects()
      setData(projects)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch projects')
      setError(error)
      console.error('[useGithubProjects]', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [retryCount])

  const retry = () => {
    setRetryCount((prev) => prev + 1)
  }

  return {
    data,
    isLoading,
    error,
    retry,
  }
}
