import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const linkVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: i * 0.05,
    },
  }),
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: i * 0.06,
    },
  }),
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('#top')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleNavClick = (href: string) => {
      setActiveSection(href)
    }

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href)
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              handleNavClick(link.href)
            }
          },
          { threshold: 0.5 }
        )
        observer.observe(element)
      }
    })
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur border-b border-line/50 shadow-lg'
          : 'bg-surface/50 backdrop-blur-sm'
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-20 items-center justify-between"
      >
        {/* Logo */}
        <motion.a
          href="#top"
          className="text-2xl font-display tracking-tight text-ink transition-colors duration-200 hover:text-accent"
          aria-label="Rodrigo Soares, back to top"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {'{R}'}
        </motion.a>

        {/* Desktop Menu */}
        <motion.ul
          className="hidden items-center gap-8 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href
            return (
              <motion.li
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  className="group relative text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-accent"
                  whileHover={{}}
                >
                  {link.label}

                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-dim"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />

                  {/* Active dot indicator */}
                  <motion.span
                    className="absolute -right-5 top-1/2 h-1.5 w-1.5 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  />
                </motion.a>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Desktop Actions */}
        <motion.div
          className="hidden items-center gap-4 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />

          <motion.a
            href="#contact"
            className="group relative overflow-hidden rounded-xl bg-accent px-6 py-2.5 font-medium text-white transition-all duration-200"
            whileHover={{
              boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow background */}
            <motion.span
              className="absolute inset-0 -z-10 bg-gradient-to-r from-accent via-accent-dim to-accent opacity-0"
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />

            {/* Text */}
            <motion.span
              className="relative block"
              whileHover={{ y: -1 }}
            >
              Let's talk
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.div
          className="flex items-center gap-2 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />

          <motion.button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
              isMenuOpen
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-ink/15 text-ink hover:border-accent/50'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, height: 'auto', backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="overflow-hidden border-t border-line/50 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-md md:hidden"
          >
            <motion.ul
              className="container-page flex flex-col gap-1 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href
                return (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.a
                      href={link.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setActiveSection(link.href)
                      }}
                      className={`relative block rounded-lg px-3 py-3 text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-accent/15 text-accent'
                          : 'text-ink hover:bg-accent/5 hover:text-accent'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        className="flex items-center gap-2"
                        whileHover={{ x: 2 }}
                      >
                        {isActive && (
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                            layoutId="active-indicator"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        {link.label}
                      </motion.span>
                    </motion.a>
                  </motion.li>
                )
              })}

              <motion.li
                className="pt-2"
                custom={navLinks.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-solid w-full justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's talk
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

