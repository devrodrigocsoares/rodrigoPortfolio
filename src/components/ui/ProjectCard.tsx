import { motion } from 'framer-motion'
import { ExternalLink, Github, Sparkles } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

/**
 * Generates a subtle gradient based on project name hash
 * Used as fallback when project image is not available
 */
function getGradientForProject(projectName: string): string {
  const colors = [
    'from-blue-600 via-blue-500 to-cyan-400',
    'from-purple-600 via-purple-500 to-pink-400',
    'from-emerald-600 via-emerald-500 to-teal-400',
    'from-orange-600 via-orange-500 to-yellow-400',
    'from-rose-600 via-rose-500 to-red-400',
    'from-indigo-600 via-indigo-500 to-blue-400',
  ]
  const hash = projectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export function ProjectCard({ project }: ProjectCardProps) {
  const gradient = getGradientForProject(project.title)

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/50 bg-surface
        shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-accent/30 focus-within:shadow-2xl focus-within:border-accent/30"
    >
      {/* Image / Gradient Background */}
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full" />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
            <Sparkles size={12} aria-hidden="true" />
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
            {project.title}
          </h3>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-soft to-accent-soft/50 px-3 py-1 text-xs font-semibold text-accent-dim transition-all hover:shadow-md"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-line/40 px-3 py-1 text-xs font-semibold text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3 pt-3">
          {project.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${project.title} source on GitHub`}
              className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:shadow-lg sm:flex-none"
            >
              <Github size={16} aria-hidden="true" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open live demo of ${project.title}`}
              className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-accent bg-transparent px-4 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent/10 hover:shadow-lg sm:flex-none"
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
