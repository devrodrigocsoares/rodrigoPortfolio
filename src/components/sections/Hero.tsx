import { motion } from 'framer-motion'
import { heroSkills } from '@/data/heroSkills'
import { useTypewriter } from '@/hooks/useTypewriter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { heroDev } from '@/data/heroDev'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: 'easeOut' },
  }),
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { text } = useTypewriter(heroSkills,  { disabled: prefersReducedMotion })
  const { textDev } = useTypewriter(heroDev,  { disabled: prefersReducedMotion })

  return (
   <section id="top" className="relative overflow-hidden pb-20 pt-16 sm:pt-20">
  <div className="container-page">
    <div className="mx-auto max-w-4xl">

      <motion.h1
        initial="hidden"
        animate="show"
        custom={0}
        variants={fadeUp}
        className="max-w-3xl whitespace-normal sm:whitespace-nowrap text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl"
      >
        Rodrigo

        <span
          aria-hidden="true"
          className="ml-5 text-accent-dim"
        >
          {textDev}
          <span className="typewriter-cursor">|</span>
        </span>

        <span className="sr-only">
          {heroDev.join(', ')}
        </span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="show"
        custom={0.15}
        variants={fadeUp}
        className="mt-5 min-h-[1.75rem] font-mono text-sm text-muted sm:text-base"
      >
       

        <span aria-hidden="true" className="text-accent-dim">
          {text}
          <span className="typewriter-cursor">|</span>
        </span>

        <span className="sr-only">
          {heroSkills.join(',')}
        </span>
      </motion.p>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto]">

       <motion.div
        initial="hidden"
        animate="show"
        custom={0.3}
        variants={fadeUp}
      >
        <p className="max-w-2xl text-xl font-medium leading-relaxed text-ink sm:text-2xl">
          Software engineer focused on building
          <span className="text-accent"> modern products</span>,
          <span className="text-accent"> intelligent systems</span> and
          <span className="text-accent"> meaningful digital experiences</span>.
        </p>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          I combine software engineering, artificial intelligence
          and product thinking to turn complex ideas into simple solutions.
        </p>
      </motion.div>
       

      </div>

    </div>
  </div>
</section>
  )
}
