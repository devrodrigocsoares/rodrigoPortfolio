import { motion, useReducedMotion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { linkedinProfileUrl, workHighlights } from '@/data/work'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Entrada simples: fade + leve subida, sem scale/spring.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function RecentWork() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="container-page">
        <SectionTitle
          title="My Recent Work"
          description="Here are some companies I've worked for."
        />

        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          variants={shouldReduceMotion ? undefined : containerVariants}
        >
          {workHighlights.map((item) => (
            <motion.a
              key={item.id}
              href={item.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              variants={shouldReduceMotion ? undefined : cardVariants}
              className="group block overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-300 hover:border-accent/60"
              aria-label={`${item.company} — ${item.role}`}
            >
              <div className="overflow-hidden bg-navy/5">
                <img
                  src={item.image}
                  alt={`${item.company} — ${item.role}`}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{item.company} — {item.period}</p>
                  <p className="truncate text-xs text-muted">{item.role}</p>
                  <p className="truncate text-xs text-muted">{item.description}</p>
                </div>
                <Linkedin
                  size={16}
                  className="shrink-0 text-muted transition-colors duration-300 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button
            as="a"
            href={linkedinProfileUrl}
            target="_blank"
            rel="noreferrer noopener"
            icon={<Linkedin size={16} aria-hidden="true" />}
          >
            See more on LinkedIn
          </Button>
        </div>
      </div>
    </section>
  )
}
