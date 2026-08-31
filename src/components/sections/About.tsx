import { motion } from 'framer-motion'
import { Layers, Server, Terminal } from 'lucide-react'
import { focusAreas } from '@/data/focusAreas'
import { FocusArea } from '@/types'

const iconMap: Record<FocusArea['icon'], typeof Layers> = {
  layers: Layers,
  terminal: Terminal,
  server: Server,
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 20,
      delay: i * 0.1,
    },
  }),
}

const iconVariants = {
  hidden: { scale: 0, rotateZ: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotateZ: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 14,
      delay: i * 0.1 + 0.2,
    },
  }),
}

export function About() {
  return (
    <section id="about" className="bg-navy pb-28 pt-20 text-white sm:pb-36">
      <div className="container-page">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl">Hi, I&apos;m Rodrigo. Nice to meet you!</h2>
          <motion.p className="mt-5 text-sm leading-relaxed text-white/65 transition-colors hover:text-white/80 sm:text-base">
            My academic background includes a bachelor&apos;s degree in Information Systems and a
            technical degree in Computer Science from IFCE, Cedro campus. Throughout my
            educational journey, I actively participated in interdisciplinary extension
            projects, the PIBIC Junior program, and volunteered as a mentor. These experiences
            were crucial in developing my collaborative skills and enhancing my ability to work
            effectively in teams.
          </motion.p>
        </motion.div>

        <div className="relative mt-14 grid gap-6 rounded-2xl bg-surface p-2 shadow-2xl sm:mt-16 sm:grid-cols-3 sm:gap-0 sm:p-0 [perspective:1000px]">
          {focusAreas.map((area, index) => {
            const Icon = iconMap[area.icon]
            return (
              <motion.div
                key={area.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{
                  y: -4,
                  rotateX: 5,
                  rotateY: 2,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                }}
                className={`rounded-xl px-6 py-10 text-center transition-all duration-300 sm:rounded-none sm:px-8 sm:py-12 ${
                  index !== 0 ? 'sm:border-l sm:border-line' : ''
                }`}
              >
                <motion.span
                  custom={index}
                  variants={iconVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.15,
                    rotateZ: 360,
                    boxShadow: '0 12px 24px rgba(99, 102, 241, 0.3)',
                  }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all duration-300"
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.span>

                <motion.h3
                  className="mt-5 text-lg font-semibold text-ink transition-colors hover:text-accent"
                  whileHover={{ scale: 1.05 }}
                >
                  {area.title}
                </motion.h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>

                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {area.groups.map((group, gIdx) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + gIdx * 0.05 + 0.4 }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {group.label}
                      </p>
                      <p className="mt-1 text-sm text-ink">{group.items.join(', ')}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
