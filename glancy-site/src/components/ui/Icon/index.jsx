import React from 'react'
import { useTheme } from '@/context/ThemeContext.jsx'

// automatically import all svg assets and group them by theme
const glob =
  typeof import.meta !== 'undefined' && import.meta.glob
    ? import.meta.glob
    : () => ({})

// use relative paths instead of alias to ensure compatibility across build tools
const modules = glob('../../assets/**/*.svg', {
  eager: true,
  import: 'default'
})

// shape: { [name]: { light?: url, dark?: url, single?: url } }
const ICONS = {}

for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split('/').pop().replace('.svg', '')

  if (filename.endsWith('-light')) {
    const name = filename.replace('-light', '')
    ICONS[name] = { ...(ICONS[name] || {}), light: mod }
  } else if (filename.endsWith('-dark')) {
    const name = filename.replace('-dark', '')
    ICONS[name] = { ...(ICONS[name] || {}), dark: mod }
  } else {
    const name = filename
    ICONS[name] = { ...(ICONS[name] || {}), single: mod }
  }
}

export function ThemeIcon({ name, alt, ...props }) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
  const src = ICONS[name]?.[theme] || ICONS[name]?.single
  if (!src) return null
  return <img src={src} alt={alt || name} {...props} />
}

export const EllipsisVerticalIcon = (props) => (
  <ThemeIcon name="ellipsis-vertical" alt="ellipsis" {...props} />
)
export const StarSolidIcon = (props) => (
  <ThemeIcon name="star-solid" alt="star" {...props} />
)
export const TrashIcon = (props) => (
  <ThemeIcon name="trash" alt="trash" {...props} />
)

export default ThemeIcon
