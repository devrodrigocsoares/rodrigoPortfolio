import { motion } from 'framer-motion'
import { Layers, Server, Terminal } from 'lucide-react'
import { focusAreas } from '@/data/focusAreas'
import { FocusArea } from '@/types'

const iconMap: Record<FocusArea['icon'], typeof Layers> = {
  layers: Layers,
  terminal: Terminal,
  server: Server,
}

export function About() {
  return (
    <section id="about" className="bg-navy pb-28 pt-20 text-white sm:pb-36">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Hi, I'm Rodrigo. Nice to meet you!</h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-base">
            My academic background includes a bachelor's degree in Information Systems and a
            technical degree in Computer Science from IFCE, Cedro campus. Throughout my
            educational journey, I actively participated in interdisciplinary extension
            projects, the PIBIC Junior program, and volunteered as a mentor. These experiences
            were crucial in developing my collaborative skills and enhancing my ability to work
            effectively in teams.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 rounded-2xl bg-surface p-2 shadow-2xl sm:mt-16 sm:grid-cols-3 sm:gap-0 sm:p-0">
          {focusAreas.map((area, index) => {
            const Icon = iconMap[area.icon]
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`rounded-xl px-6 py-10 text-center sm:rounded-none sm:px-8 sm:py-12 ${
                  index !== 0 ? 'sm:border-l sm:border-line' : ''
                }`}
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>

                <div className="mt-6 space-y-4">
                  {area.groups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {group.label}
                      </p>
                      <p className="mt-1 text-sm text-ink/80">{group.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
