/**
 * Transforms GitHub API responses into portfolio Project domain model
 * Decouples API contract from UI representation
 */

import { Project } from '@/types'
import { GitHubRepository } from './github.types'

/**
 * Checks if a repository should be included in portfolio
 */
export function shouldIncludeRepository(
  repo: GitHubRepository,
  options: {
    includeForks: boolean
    includeArchived: boolean
    excluded: string[]
  }
): boolean {
  // Exclude by name
  if (options.excluded.includes(repo.name)) {
    return false
  }

  // Exclude forks if not included
  if (repo.fork && !options.includeForks) {
    return false
  }

  // Exclude archived if not included
  if (repo.archived && !options.includeArchived) {
    return false
  }

  // Exclude empty descriptions (poor portfolio quality)
  if (!repo.description || repo.description.trim().length === 0) {
    return false
  }

  return true
}

/**
 * Gets the demo/homepage URL for a project
 * Priority: homepage > GitHub Pages > undefined
 */
function getDemoUrl(repo: GitHubRepository): string | undefined {
  if (repo.homepage && repo.homepage.trim().length > 0) {
    return repo.homepage
  }

  // Check for GitHub Pages (owner.github.io pattern)
  if (repo.name === `${repo.full_name.split('/')[0]}.github.io`) {
    return `https://${repo.name}`
  }

  return undefined
}

/**
 * Normalizes a GitHub repository into a Portfolio Project
 */
export function mapGitHubRepoToProject(repo: GitHubRepository): Project {
  // Use primary language or first topic; fallback to 'Project'
  const primaryTech = repo.language || repo.topics[0] || 'Project'

  return {
    id: `github-${repo.id}`,
    title: repo.name,
    description: repo.description || '',
    category: primaryTech,
    technologies: repo.topics.length > 0 ? repo.topics : [primaryTech],
    image: undefined, // GitHub doesn't provide preview images via API
    github: repo.html_url,
    demo: getDemoUrl(repo),
  }
}

/**
 * Sorts projects according to portfolio preferences
 */
export function sortProjects(
  projects: Project[],
  sortBy: 'stars' | 'updated' | 'name',
  repos: Map<string, GitHubRepository>
): Project[] {
  return [...projects].sort((a, b) => {
    const repoA = repos.get(a.id)
    const repoB = repos.get(b.id)

    if (!repoA || !repoB) return 0

    if (sortBy === 'stars') {
      return repoB.stargazers_count - repoA.stargazers_count
    }

    if (sortBy === 'updated') {
      return (
        new Date(repoB.updated_at).getTime() - new Date(repoA.updated_at).getTime()
      )
    }

    // sortBy === 'name'
    return a.title.localeCompare(b.title)
  })
}
