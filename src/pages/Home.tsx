import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { RecentWork } from '@/components/sections/RecentWork'
import { Projects } from '@/components/sections/Projects'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
          focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <RecentWork />
        <Projects />
      </main>

      <Footer />
    </div>
  )
}
