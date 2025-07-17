import { createContext, useContext, useEffect, useState } from 'react'
import lightIcon from './assets/glancy-light.svg'
import darkIcon from './assets/glancy-dark.svg'

const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {}
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      let current = theme
      if (theme === 'system') {
        current = media.matches ? 'dark' : 'light'
      }
      setResolvedTheme(current)
      document.documentElement.dataset.theme = current
      const link = document.getElementById('favicon')
      if (link) {
        link.href = current === 'dark' ? darkIcon : lightIcon
      }
    }
    apply()
    if (theme === 'system') {
      media.addEventListener('change', apply)
      return () => media.removeEventListener('change', apply)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
