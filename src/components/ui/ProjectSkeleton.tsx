/**
 * ProjectSkeleton Component
 * Placeholder animation while loading projects from GitHub
 * Matches ProjectCard dimensions and grid layout
 */

import { motion } from 'framer-motion'

/**
 * Renders a single skeleton card (shimmer animation)
 */
function ProjectSkeletonCard() {
  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    >
      {/* Image skeleton */}
      <div className="aspect-[3/2] bg-line/40" />

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 rounded-md bg-line/40" />

        {/* Description skeleton (3 lines) */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-line/40" />
          <div className="h-4 w-5/6 rounded-md bg-line/40" />
          <div className="h-4 w-4/6 rounded-md bg-line/40" />
        </div>

        {/* Technologies skeleton (4 badges) */}
        <div className="mt-1 flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-line/40" />
          ))}
        </div>

        {/* Footer buttons skeleton */}
        <div className="mt-auto flex items-center gap-4 pt-3">
          <div className="h-8 w-8 rounded-md bg-line/40" />
          <div className="h-8 w-8 rounded-md bg-line/40" />
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectSkeletonProps {
  count?: number
}

/**
 * Renders multiple skeleton cards to fill the grid
 * Default count matches the default portfolio limit (6 projects)
 */
export function ProjectSkeleton({ count = 6 }: ProjectSkeletonProps) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (index % 3) * 0.05 }}
        >
          <ProjectSkeletonCard />
        </motion.div>
      ))}
    </>
  )
}
