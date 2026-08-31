import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface
        shadow-card transition-shadow duration-300 hover:shadow-cardHover focus-within:shadow-cardHover"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-line/40">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-mono text-muted">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-mono text-accent-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 pt-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${project.title} source on GitHub`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <Github size={16} aria-hidden="true" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open live demo of ${project.title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
