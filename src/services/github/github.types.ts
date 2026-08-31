/**
 * GitHub REST API Response Types
 * https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28
 */

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  url: string
  html_url: string
  homepage: string | null
  fork: boolean
  archived: boolean
  language: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  created_at: string
  pushed_at: string | null
}

export interface GitHubApiError {
  message: string
  documentation_url?: string
  status?: number
}

export interface GitHubApiResponse {
  items: GitHubRepository[]
  total_count: number
  incomplete_results: boolean
}

/**
 * Cache entry for GitHub API response
 */
export interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}
