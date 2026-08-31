import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/50 bg-surface
        shadow-sm transition-all duration-300 hover:shadow-lg hover:border-line/80 focus-within:shadow-lg focus-within:border-line/80"
    >
      {/* Image Container — Neutral Background */}
      <div className="relative aspect-[16/10] overflow-hidden bg-line/10">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Neutral fallback instead of colorful gradient */
          <div className="h-full w-full bg-gradient-to-br from-line/20 to-line/5" />
        )}

        {/* Subtle overlay on hover — much less dominant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-3 p-6 sm:gap-4">
        {/* Project Title */}
        <div>
          <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">
            {project.title}
          </h3>
        </div>

        {/* Project Description — Now Visible */}
        {project.description && (
          <p className="text-sm leading-relaxed text-muted line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Technologies — Neutral, Minimal Style */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-md border border-line/60 bg-surface px-2.5 py-1 text-xs font-medium text-muted transition-colors duration-200 hover:border-line hover:bg-line/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="inline-flex rounded-md border border-line/40 bg-surface px-2.5 py-1 text-xs font-medium text-muted/60">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Action Buttons — Minimal, Professional */}
        <div className="mt-auto flex items-center gap-2 pt-4 sm:gap-3">
          {project.github && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${project.title} source on GitHub`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line/80 bg-surface px-3 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:border-line hover:bg-line/10 sm:flex-none"
            >
              <Github size={16} aria-hidden="true" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open live demo of ${project.title}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-dim hover:shadow-md sm:flex-none"
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
