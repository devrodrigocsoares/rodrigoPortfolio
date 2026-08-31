import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { linkedinProfileUrl, workHighlights } from '@/data/work'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

export function RecentWork() {
  return (
    <section id="work" className="py-24 sm:py-28">
      <div className="container-page">
        <SectionTitle
          title="My Recent Work"
          description="Here are some companies I've worked for."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workHighlights.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-line shadow-card transition-shadow hover:shadow-cardHover"
              aria-label={`${item.company} — ${item.role}`}
            >
              <img
                src={item.image}
                alt={`${item.company} — ${item.role}`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.a>
          ))}
        </div>

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
