import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { SectionTitle } from '@/components/ui/SectionTitle'

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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-mono text-accent-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
