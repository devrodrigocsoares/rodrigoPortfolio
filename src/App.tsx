import { ThemeProvider } from '@/context/ThemeContext'
import { ThemeTransitionOverlay } from '@/components/ui/ThemeTransitionOverlay'
import { Home } from '@/pages/Home'

function App() {
  return (
    <ThemeProvider>
      <Home />
      <ThemeTransitionOverlay />
    </ThemeProvider>
  )
}

export default App
