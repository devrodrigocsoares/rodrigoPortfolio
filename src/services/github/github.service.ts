/**
 * GitHub REST API Service
 * Handles authentication, caching, error handling, and rate limiting
 * Public API: no authentication required (60 requests/hour)
 */

import { githubConfig } from '@/config/github'
import { GitHubRepository, GitHubApiError, CacheEntry } from './github.types'
import { mapGitHubRepoToProject, shouldIncludeRepository, sortProjects } from './github.mapper'
import { Project } from '@/types'

/**
 * Simple in-memory cache for API responses
 */
class GitHubApiCache {
  private cache = new Map<string, CacheEntry<GitHubRepository[]>>()

  get(key: string): GitHubRepository[] | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  set(key: string, data: GitHubRepository[]): void {
    const now = Date.now()
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + githubConfig.cacheDuration,
    })
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }
}

const cache = new GitHubApiCache()

/**
 * Checks GitHub API response for errors
 */
function isGitHubError(data: unknown): data is GitHubApiError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as Record<string, unknown>).message === 'string'
  )
}

/**
 * Fetches repositories from GitHub API with timeout and error handling
 */
async function fetchFromGitHubApi(url: string): Promise<unknown> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), githubConfig.timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        isGitHubError(errorData)
          ? errorData.message
          : `GitHub API error: ${response.status} ${response.statusText}`
      )
    }

    return response.json()
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Fetches user repositories from GitHub
 */
async function fetchUserRepositories(username: string): Promise<GitHubRepository[]> {
  const cacheKey = `user-repos-${username}`
  const cached = cache.get(cacheKey)
  if (cached) return cached

  // Using GitHub REST API v3 to fetch public repositories
  // Docs: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
  const url = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100`

  const data = await fetchFromGitHubApi(url)

  if (!Array.isArray(data)) {
    throw new Error('Unexpected GitHub API response format')
  }

  const repos = data as GitHubRepository[]
  cache.set(cacheKey, repos)
  return repos
}

/**
 * Main service function: Fetches and processes GitHub projects for portfolio
 */
export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const repos = await fetchUserRepositories(githubConfig.username)

    // Filter repositories according to config
    const filtered = repos.filter((repo) =>
      shouldIncludeRepository(repo, {
        includeForks: githubConfig.includeForks,
        includeArchived: githubConfig.includeArchived,
        excluded: githubConfig.excluded,
      })
    )

    // Map to portfolio domain model
    const projects = filtered.map(mapGitHubRepoToProject)

    // Create a map for sorting reference
    const repoMap = new Map(filtered.map((repo) => [`github-${repo.id}`, repo]))

    // Sort according to preferences
    const sorted = sortProjects(projects, githubConfig.sortBy, repoMap)

    // Apply limit
    return sorted.slice(0, githubConfig.limit)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[GitHub Service] Error fetching projects:', message)
    const err = new Error(`Failed to fetch GitHub projects: ${message}`)
    if (error instanceof Error) {
      ;(err as unknown as { cause: Error }).cause = error
    }
    throw err
  }
}

/**
 * Clears the API cache (useful for testing or manual refresh)
 */
export function clearGitHubCache(): void {
  cache.clear()
}
