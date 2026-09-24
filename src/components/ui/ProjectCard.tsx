import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    // The wrapper never moves, so the hover area stays put while the article lifts —
    // otherwise a cursor resting on the card's bottom edge makes it flicker up and down.
    <div className="group h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line/50 bg-surface
          shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out
          group-hover:-translate-y-1 group-hover:border-line/80 group-hover:shadow-lg
          focus-within:border-line/80 focus-within:shadow-lg"
      >
      

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
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`View ${project.title} source on GitHub`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line/80 bg-surface px-3 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-line hover:bg-line/10 active:scale-[0.98] sm:flex-none"
              >
                <Github size={16} aria-hidden="true" />
                <span>Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open live demo of ${project.title}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-white transition-[background-color,box-shadow] duration-200 hover:bg-accent-dim hover:shadow-md active:scale-[0.98] sm:flex-none"
              >
                <ExternalLink size={16} aria-hidden="true" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
