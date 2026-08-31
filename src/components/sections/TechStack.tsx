import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { SectionTitle } from '@/components/ui/SectionTitle'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
      delayChildren: 0.7,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      mass: 0.8,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      delay: i * 0.05,
    },
  }),
}

export function TechStack() {
  return (
    <section aria-labelledby="tech-stack-heading" className="py-24 sm:py-28">
      <div className="container-page">
        <div id="tech-stack-heading">
          <SectionTitle
            eyebrow="Toolbox"
            title="Technologies I work with"
            description="The languages, frameworks, and infrastructure I reach for most, grouped by where they sit in the stack."
          />
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              whileHover={{
                y: -8,
                rotateX: 8,
                rotateY: 5,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
              }}
              className="group rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 [perspective:1000px] hover:border-accent/50"
            >
              <motion.h3
                className="text-sm font-semibold uppercase tracking-wide text-accent group-hover:text-accent"
                whileHover={{ letterSpacing: '0.15em' }}
              >
                {group.category}
              </motion.h3>

              <motion.ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, idx) => (
                  <motion.li
                    key={item}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
                    }}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-mono text-accent-dim transition-all duration-200 hover:bg-accent hover:text-white"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
