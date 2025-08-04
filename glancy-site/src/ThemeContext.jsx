import { createContext, useContext, useRef } from 'react'
import { useSyncExternalStore } from 'react'
import lightIcon from './assets/glancy-web-light.svg'
import darkIcon from './assets/glancy-web-dark.svg'
import { createThemeService } from './services/ThemeService.js'

const ThemeContext = createContext(
  createThemeService({ icons: { light: lightIcon, dark: darkIcon } })
)

export function ThemeProvider({ service, children }) {
  const storeRef = useRef(
    service || createThemeService({ icons: { light: lightIcon, dark: darkIcon } })
  )
  const store = storeRef.current
  const { theme, resolvedTheme } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  )

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: store.setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)

