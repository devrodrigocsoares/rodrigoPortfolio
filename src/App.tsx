import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { ThemeTransitionOverlay } from '@/components/ui/ThemeTransitionOverlay'
import { Home } from '@/pages/Home'

function App() {
  return (
    // reducedMotion="user": quem pede "reduzir movimento" no sistema recebe só
    // fades — sem deslocamentos — em TODAS as animações do framer-motion.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Home />
        <ThemeTransitionOverlay />
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
