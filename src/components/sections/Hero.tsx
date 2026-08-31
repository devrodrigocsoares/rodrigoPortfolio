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
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay,
    },
  }),
}

const blurInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 20,
      delay,
    },
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
        variants={blurInUp}
        className="max-w-3xl whitespace-normal sm:whitespace-nowrap text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl"
      >
        Rodrigo

        <motion.span
          aria-hidden="true"
          className="ml-5 text-accent-dim transition-colors hover:text-accent"
          whileHover={{ scale: 1.05 }}
        >
          {textDev}
          <span className="typewriter-cursor">|</span>
        </motion.span>

        <span className="sr-only">
          {heroDev.join(', ')}
        </span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="show"
        custom={0.2}
        variants={blurInUp}
        className="mt-5 min-h-[1.75rem] font-mono text-sm text-muted sm:text-base"
      >
       

        <motion.span
          aria-hidden="true"
          className="text-accent-dim"
          whileHover={{ scale: 1.02 }}
        >
          {text}
          <span className="typewriter-cursor">|</span>
        </motion.span>

        <span className="sr-only">
          {heroSkills.join(',')}
        </span>
      </motion.p>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto]">

       <motion.div
        initial="hidden"
        animate="show"
        custom={0.4}
        variants={fadeUp}
      >
        <p className="max-w-2xl text-xl font-medium leading-relaxed text-ink sm:text-2xl">
          Software engineer focused on building
          <motion.span
            className="text-accent"
            whileHover={{ scale: 1.05, display: 'inline' }}
          >
            {' modern products'}
          </motion.span>
          ,
          <motion.span
            className="text-accent"
            whileHover={{ scale: 1.05 }}
          >
            {' intelligent systems'}
          </motion.span>
          {' and'}
          <motion.span
            className="text-accent"
            whileHover={{ scale: 1.05 }}
          >
            {' meaningful digital experiences'}
          </motion.span>
          .
        </p>

        <motion.p className="mt-5 max-w-xl text-base leading-relaxed text-muted transition-colors hover:text-ink">
          I combine software engineering, artificial intelligence
          and product thinking to turn complex ideas into simple solutions.
        </motion.p>
      </motion.div>
       

      </div>

    </div>
  </div>
</section>
  )
}
