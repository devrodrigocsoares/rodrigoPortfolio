import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { useGithubProjects } from '@/hooks/useGithubProjects'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectSkeleton } from '@/components/ui/ProjectSkeleton'
import { ProjectsError } from '@/components/ui/ProjectsError'
import { Button } from '@/components/ui/Button'
import { revealUp } from '@/lib/motion'

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
                // Stagger só dentro da fileira (lg:grid-cols-3). Um delay baseado no
                // índice da lista inteira faz cards mais abaixo esperarem depois de já
                // estarem visíveis.
                custom={(index % 3) * 0.06}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="contact"
          className="mx-auto mt-24 max-w-2xl scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-sm transition-colors duration-300 sm:px-10 sm:py-16 hover:border-white/20"
        >
          <p className="flex items-center justify-center gap-2 text-base font-semibold text-white/70 sm:text-lg">
            Got an idea? <span aria-hidden="true">→</span>
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white transition-colors hover:text-accent sm:text-3xl">
            Let&apos;s build something amazing together
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            I&apos;m always interested in hearing about new projects, interesting ideas, and partnerships.
            Feel free to reach out!
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button
              as="a"
              href="https://wa.me/5588998427392?text=Ol%C3%A1%2C%20Rodrigo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              variant="invert"
              icon={<MessageSquare size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              Let&apos;s chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
