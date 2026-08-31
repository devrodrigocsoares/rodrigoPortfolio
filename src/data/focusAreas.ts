import { FocusArea } from '@/types'

export const focusAreas: FocusArea[] = [
  {
    icon: 'layers',
    title: 'Designer',
    description:
      'I value simple content structure, clean design patterns, and thoughtful interactions.',
    groups: [
      { label: 'Things I enjoy designing', items: ['UX', 'UI', 'Web'] },
      { label: 'Design tools', items: ['Figma'] },
    ],
  },
  {
    icon: 'terminal',
    title: 'Frontend Developer',
    description:
      'I like to code things from scratch, and enjoy bringing ideas to life in the browser.',
    groups: [
      { label: 'Languages I speak', items: ['HTML5', 'CSS3', 'JavaScript', 'ReactJS'] },
      { label: 'Dev tools', items: ['Bootstrap', 'Tailwind CSS'] },
    ],
  },
  {
    icon: 'server',
    title: 'Backend Developer',
    description:
      'Integrating machine learning and business rules in the back-end automates decisions and improves the user experience.',
    groups: [
      { label: 'Languages I speak', items: ['C', 'JavaScript', 'TypeScript', 'Python'] },
      { label: 'Dev tools', items: ['PostgreSQL', 'MongoDB', 'Node', 'AWS'] },
    ],
  },
]
