import lightIcon from '../assets/glancy-web-light.svg'
import darkIcon from '../assets/glancy-web-dark.svg'

export function setupTheme() {
  const storedLang = localStorage.getItem('lang')
  if (storedLang) {
    document.documentElement.lang = storedLang
  }
  const theme = localStorage.getItem('theme') || 'system'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
  document.documentElement.dataset.theme = resolved
  const link = document.getElementById('favicon')
  if (link) {
    link.href = resolved === 'dark' ? darkIcon : lightIcon
  }
}
