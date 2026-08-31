/**
 * GitHub API Configuration for Portfolio Projects
 * Controls which repositories are fetched and how they're displayed
 */

export const githubConfig = {
  /** GitHub username to fetch repositories from */
  username: 'devrodrigocsoares',

  /** Maximum number of projects to display in portfolio */
  limit: 6,

  /** Repository IDs (or names) to highlight at the top */
  featured: [],

  /** Repository names to exclude from portfolio */
  excluded: ['teste', 'test-repo'],

  /** Whether to include forked repositories */
  includeForks: false,

  /** Whether to include archived repositories */
  includeArchived: false,

  /** API cache duration in milliseconds (5 minutes) */
  cacheDuration: 5 * 60 * 1000,

  /** Sort order: 'stars' | 'updated' | 'name' */
  sortBy: 'stars' as const,

  /** API timeout in milliseconds */
  timeout: 10000,
}
