import {  Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { socials } from '@/data/socials'
import { SocialLink } from '@/types'

const iconMap: Record<SocialLink['icon'], typeof Linkedin> = {
  
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  instagram: Instagram,
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <span className="font-display text-2xl font-extrabold">{'{R}'}</span>

        <p className="max-w-sm text-sm leading-relaxed text-white/60">
          Living, learning, &amp; leveling up one day at a time.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((social) => {
            const Icon = iconMap[social.icon]
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.icon === 'mail' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15
                    text-white/80 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <p className="text-xs font-mono text-white/40">
          Handcrafted by me <span aria-hidden="true">•</span> @RodrigoCSoares
        </p>
      </div>
    </footer>
  )
}
