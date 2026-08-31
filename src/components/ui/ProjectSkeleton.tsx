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
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-line/50 bg-surface"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
    >
      {/* Image skeleton */}
      <div className="aspect-[16/10] bg-gradient-to-br from-line/40 to-line/20" />

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Title skeleton */}
        <div className="h-7 w-3/4 rounded-lg bg-line/40" />

        {/* Technologies skeleton (4 badges) */}
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-line/40" />
          ))}
        </div>

        {/* Footer buttons skeleton */}
        <div className="mt-auto flex gap-3 pt-4">
          <div className="flex-1 h-10 rounded-xl bg-line/40" />
          <div className="flex-1 h-10 rounded-xl bg-line/40" />
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <ProjectSkeletonCard />
        </motion.div>
      ))}
    </>
  )
}
