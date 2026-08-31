import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { linkedinProfileUrl, workHighlights } from '@/data/work'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export function RecentWork() {
  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="container-page">
        <SectionTitle
          title="My Recent Work"
          description="Here are some companies I've worked for."
        />

        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {workHighlights.map((item) => (
            <motion.a
              key={item.id}
              href={item.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
              }}
              className="group relative overflow-hidden rounded-2xl border border-line shadow-card transition-all duration-300 hover:border-accent/50"
              aria-label={`${item.company} — ${item.role}`}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <motion.img
                src={item.image}
                alt={`${item.company} — ${item.role}`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
        >
          <Button
            as="a"
            href={linkedinProfileUrl}
            target="_blank"
            rel="noreferrer noopener"
            icon={<Linkedin size={16} aria-hidden="true" />}
          >
            See more on LinkedIn
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
