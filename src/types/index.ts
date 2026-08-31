export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'linkedin' |'github' | 'mail' | 'instagram'
}

export interface FocusArea {
  icon: 'layers' | 'terminal' | 'server'
  title: string
  description: string
  groups: {
    label: string
    items: string[]
  }[]
}

export interface WorkHighlight {
  id: string
  company: string
  role: string
  image: string
  linkedinUrl: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  image?: string
  github?: string
  demo?: string
}

export interface SkillGroup {
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps/Cloud'
  items: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  period: string
  description: string
}

export type ThemeMode = 'light' | 'dark'

