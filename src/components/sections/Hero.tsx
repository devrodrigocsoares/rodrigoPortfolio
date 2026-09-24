import { motion } from 'framer-motion'
import { heroSkills } from '@/data/heroSkills'
import { useTypewriter } from '@/hooks/useTypewriter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { heroDev } from '@/data/heroDev'
import { revealUp } from '@/lib/motion'

// A frase mais longa de cada typewriter. Ela é renderizada invisível para
// reservar o espaço máximo, assim o layout não muda de tamanho (nem desliza,
// quando o texto está centralizado) a cada letra digitada ou apagada.
const longest = (words: string[]) => words.reduce((a, b) => (b.length > a.length ? b : a), '')
const longestDev = longest(heroDev)
const longestSkill = longest(heroSkills)

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { text } = useTypewriter(heroSkills,  { disabled: prefersReducedMotion })
  const { textDev } = useTypewriter(heroDev,  { disabled: prefersReducedMotion })

  return (
   <section id="top" className="relative overflow-hidden pb-20 sm:pt-10 lg:pt-32 ">
  <div className="container-page flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center lg:text-center sm:items-start sm:text-left">
    <div className="mx-auto max-w-4xl">

      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0}
        variants={revealUp}
        className="max-w-3xl min-h-[2.2em] whitespace-normal sm:min-h-0 sm:whitespace-nowrap text-4xl font-bold leading-[1.1] tracking-tight text-ink "
      >
        Rodrigo

        {/* No sm+ o título é sempre uma linha: o typewriter ocupa uma caixa de
            largura fixa. No mobile o texto quebra naturalmente e o h1 reserva
            2 linhas (min-h) para o conteúdo abaixo não pular. */}
        <span className="ml-2 sm:inline-grid sm:text-left">
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 hidden sm:block">
            {longestDev}
            <span className="ml-0.5 inline-block">|</span>
          </span>
          <span
            aria-hidden="true"
            className="col-start-1 row-start-1 text-accent-dim transition-colors hover:text-accent"
          >
            {textDev}
            <span className="typewriter-cursor">|</span>
          </span>
        </span>

        <span className="sr-only">
          {heroDev.join(',')}
        </span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.1}
        variants={revealUp}
        className="mt-5 min-h-[1.75rem] font-mono text-sm text-muted sm:text-base"
      >
        <span className="inline-grid text-left">
          <span aria-hidden="true" className="invisible col-start-1 row-start-1">
            {longestSkill}
            <span className="ml-0.5 inline-block">|</span>
          </span>
          <span aria-hidden="true" className="col-start-1 row-start-1 text-accent-dim">
            {text}
            <span className="typewriter-cursor">|</span>
          </span>
        </span>

        <span className="sr-only">
          {heroSkills.join(',')}
        </span>
      </motion.p>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto]">

       <motion.div
        initial="hidden"
        animate="visible"
        custom={0.2}
        variants={revealUp}
      >
        <p className="max-w-2xl sm:text-xl lg:text-xl font-medium leading-relaxed text-ink ">
          Software engineer focused on building
          <span className="text-accent">{' modern products'}</span>
          ,
          <span className="text-accent">{' intelligent systems'}</span>
          {' and'}
          <span className="text-accent">{' meaningful digital experiences'}</span>
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
