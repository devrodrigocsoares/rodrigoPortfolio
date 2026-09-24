import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Layers, Server, Terminal } from 'lucide-react'
import { focusAreas } from '@/data/focusAreas'
import { aboutPhoto } from '@/data/aboutPhoto'
import { revealUp } from '@/lib/motion'
import { FocusArea } from '@/types'

const iconMap: Record<FocusArea['icon'], typeof Layers> = {
  layers: Layers,
  terminal: Terminal,
  server: Server,
}

// Uma única entrada simples: fade + leve subida, com um pequeno stagger
// entre os cards. Sem rotação 3D, sem spring, sem efeitos de hover.
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.08 },
  }),
}

/**
 * The portrait as part of the section's background.
 *
 * - Desktop: a tall column bleeding off the right edge of the screen. It dissolves
 *   to navy on its left and bottom edges, so the copy on the left never touches it.
 * - Mobile: a banner across the top that dissolves downward; the heading starts
 *   where the photo is already almost fully navy.
 * The masks live in index.css (`.about-photo`), the glow in `.about-photo-glow`.
 */
function AboutPhoto({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Covers images that finished loading (e.g. from cache) before React attached onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] sm:h-[30rem]
        lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[54%]"
    >
      <div aria-hidden="true" className="about-photo-glow absolute inset-0" />
      <img
        ref={imgRef}
        src={src}
        alt={aboutPhoto.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: aboutPhoto.objectPosition }}
        className={`about-photo absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export function About() {
  const shouldReduceMotion = useReducedMotion()
  const photoSrc = aboutPhoto.src

  return (
    <section id="about" className="relative overflow-hidden bg-navy pb-28 text-white sm:pb-36">
      {/* Intro band: portrait in the background, copy in the foreground */}
      <div
        className={`relative ${
          photoSrc ? 'pt-[19rem] sm:pt-[22rem] lg:flex lg:min-h-[36rem] lg:items-center lg:pb-16 lg:pt-32 xl:min-h-[40rem]' : 'pt-20'
        }`}
      >
        {photoSrc && <AboutPhoto src={photoSrc} />}

        {/* w-full: as a flex item on desktop, container-page (mx-auto) would otherwise shrink to
            its content and center itself instead of spanning the container. */}
        <div className="container-page relative w-full">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={
              photoSrc
                ? 'mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-[28rem] lg:text-left xl:max-w-[32rem]'
                : 'mx-auto max-w-2xl text-center'
            }
          >
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Hi, I&apos;m Rodrigo. Nice to meet you!
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              My academic background includes a bachelor&apos;s degree in Information Systems and a
              technical degree in Computer Science from IFCE, Cedro campus. Throughout my
              educational journey, I actively participated in interdisciplinary extension
              projects, the PIBIC Junior program, and volunteered as a mentor. These experiences
              were crucial in developing my collaborative skills and enhancing my ability to work
              effectively in teams.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-page">
        {/* With a photo, the intro band already provides the spacing on desktop. */}
        <div
          className={`relative mt-14 grid gap-6 rounded-2xl bg-surface p-2 shadow-2xl sm:mt-16 sm:grid-cols-3 sm:gap-0 sm:p-0 ${
            photoSrc ? 'lg:mt-0' : ''
          }`}
        >
          {focusAreas.map((area, index) => {
            const Icon = iconMap[area.icon]
            return (
              <motion.div
                key={area.title}
                custom={index}
                variants={shouldReduceMotion ? undefined : cardVariants}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                whileInView={shouldReduceMotion ? undefined : 'visible'}
                viewport={{ once: true, margin: '-80px' }}
                className={`rounded-xl px-6 py-10 text-center sm:rounded-none sm:px-8 sm:py-12 ${
                  index !== 0 ? 'sm:border-l sm:border-line' : ''
                }`}
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white sm:h-14 sm:w-14">
                  <Icon size={20} aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-ink">{area.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>

                <div className="mt-6 space-y-4">
                  {area.groups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {group.label}
                      </p>
                      <p className="mt-1 text-sm text-ink">{group.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
