import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { revealUp } from '@/lib/motion'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Um único movimento por card (fade + subida curta). Os chips não animam
// individualmente — eles já chegam junto com o card — e o hover só troca
// cor/sombra via CSS, sem mover nada. Isso evita o "tremor" causado por
// elementos que mudam de posição debaixo do cursor.
const COLUMNS = 4 // lg:grid-cols-4 — o stagger reinicia a cada linha do grid

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
              custom={(index % COLUMNS) * 0.06}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-cardHover"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                {group.category}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent-dim transition-colors duration-200 hover:bg-accent hover:text-white"
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
