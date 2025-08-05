import React from 'react'
import { useTheme } from '@/context/ThemeContext.jsx'

// automatically import all svg assets with light/dark variants
const glob =
  typeof import.meta !== 'undefined' && import.meta.glob
    ? import.meta.glob
    : () => ({})

const lightModules = glob('@/assets/**/*-light.svg', {
  eager: true,
  import: 'default'
})
const darkModules = glob('@/assets/**/*-dark.svg', {
  eager: true,
  import: 'default'
})

const ICONS = {}

for (const [path, mod] of Object.entries(lightModules)) {
  const name = path.split('/').pop().replace('-light.svg', '')
  ICONS[name] = { ...(ICONS[name] || {}), light: mod }
}

for (const [path, mod] of Object.entries(darkModules)) {
  const name = path.split('/').pop().replace('-dark.svg', '')
  ICONS[name] = { ...(ICONS[name] || {}), dark: mod }
}

export function ThemeIcon({ name, alt, ...props }) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
  const src = ICONS[name]?.[theme]
  if (!src) return null
  return <img src={src} alt={alt || name} {...props} />
}

export default ThemeIcon
