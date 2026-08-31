import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { useGithubProjects } from '@/hooks/useGithubProjects'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectSkeleton } from '@/components/ui/ProjectSkeleton'
import { ProjectsError } from '@/components/ui/ProjectsError'
import { Button } from '@/components/ui/Button'

export function Projects() {
  const { data: projects, isLoading, error, retry } = useGithubProjects()

  return (
    <section id="projects" className="bg-navy py-24 text-white sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionTitle
          tone="dark"
          title="Featured Projects"
          description="Explore some of my recent work built with modern technologies, best practices, and attention to detail."
        />

        {/* Projects Grid */}
        <div className="mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {isLoading && <ProjectSkeleton />}

          {error && !isLoading && <ProjectsError error={error} onRetry={retry} />}

          {!isLoading &&
            !error &&
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)' }}
          id="contact"
          className="mx-auto mt-24 max-w-2xl scroll-mt-24 rounded-3xl border border-line/20 bg-gradient-to-br from-white/5 to-white/5 px-6 py-12 text-center backdrop-blur transition-all duration-300 sm:px-10 sm:py-16 hover:border-accent/30"
        >
          <motion.p
            className="flex items-center justify-center gap-2 text-lg font-semibold sm:text-xl"
            whileHover={{ scale: 1.05 }}
          >
            Got an idea? <span aria-hidden="true">💡</span>
          </motion.p>

          <motion.h3
            className="mt-3 text-2xl font-bold sm:text-3xl"
            whileHover={{ color: '#6366f1' }}
          >
            Let's build something amazing together
          </motion.h3>

          <motion.p
            className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
            whileHover={{ color: 'rgba(255, 255, 255, 0.85)' }}
          >
            I'm always interested in hearing about new projects, interesting ideas, and partnerships.
            Feel free to reach out!
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href="https://wa.me/5588998427392?text=Ol%C3%A1%2C%20Rodrigo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                variant="default"
                icon={<MessageSquare size={18} aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                Let's chat on WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
