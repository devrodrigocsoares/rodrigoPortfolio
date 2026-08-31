import { Project } from '@/types'

// Swap in your real projects — title, description, tech stack, links, and
// a screenshot under /public/images/projects/. Nine placeholders keep the
// 3x3 grid from the prototype intact until then.
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
