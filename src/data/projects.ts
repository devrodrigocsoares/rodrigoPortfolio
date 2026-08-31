import { Project } from '@/types'

/**
 * DEPRECATED: Projects are now fetched dynamically from GitHub API
 * See: src/hooks/useGithubProjects.ts
 *
 * This file is kept for reference and backward compatibility only.
 * The Projects section now loads projects via useGithubProjects hook.
 *
 * To configure which GitHub repositories appear in the portfolio, see:
 * src/config/github.ts
 */
export const projects: Project[] = Array.from({ length: 9 }, (_, index) => {
  const id = index + 1
  return {
    id: `project-${id}`,
    title: `Project ${id}`,
    description:
      'A short, honest summary of the problem this project solves and the role machine learning or engineering played in it.',
    category: id % 2 === 0 ? 'Machine Learning' : 'Web App',
    technologies: ['React', 'TypeScript', 'Node.js'],
    image: `/images/projects/project-${id}.svg`,
    github: 'https://github.com/RodrigoCSoares',
    demo: undefined,
  }
})
