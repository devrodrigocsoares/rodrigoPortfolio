import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { projects } from '@/data/projects'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button } from '@/components/ui/Button'

export function Projects() {
  return (
    <section id="projects" className="bg-navy py-24 text-white sm:py-28">
      <div className="container-page">
        <SectionTitle
          tone="dark"
          title="My Projects"
          description="I'm a bit addicted to building projects. See some from GitHub. Eventually I decided it would be a fun challenge to design and build my own."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div id="contact" className="mx-auto mt-24 max-w-xl scroll-mt-24 text-center">
          <p className="flex items-center justify-center gap-2 text-xl font-bold sm:text-2xl">
            Hi <span aria-hidden="true">👋</span>
          </p>
          <h3 className="mt-1 text-xl font-bold sm:text-2xl">
            Interested in collaborating with me?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            I'm always open to discussing machine learning work, portfolios, or partnership
            opportunities.
          </p>

          <div className="mt-8 flex justify-center">
            <Button as="a" href="https://wa.me/5588998427392?text=Ol%C3%A1%2C%20Rodrigo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
             target="_blank" variant="invert" icon={<MessageSquare size={16} aria-hidden="true" />}>
              Start a conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
