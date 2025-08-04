class ThemeService {
  constructor({ storage, matchMedia, document, icons }) {
    this.storage = storage
    this.matchMedia = matchMedia
    this.document = document
    this.icons = icons
    this.listeners = new Set()
    this.theme = storage.getItem('theme') || 'system'
    this.mediaQuery = null
  }

  getSnapshot = () => ({
    theme: this.theme,
    resolvedTheme: this._resolveTheme(),
  })

  subscribe = (callback) => {
    this.listeners.add(callback)
    if (!this.mediaQuery) {
      this.mediaQuery = this.matchMedia('(prefers-color-scheme: dark)')
      this.mediaQuery.addEventListener('change', this._handleSystemChange)
    }
    return () => {
      this.listeners.delete(callback)
      if (this.listeners.size === 0 && this.mediaQuery) {
        this.mediaQuery.removeEventListener('change', this._handleSystemChange)
        this.mediaQuery = null
      }
    }
  }

  setTheme = (next) => {
    if (this.theme === next) return
    this.theme = next
    this.storage.setItem('theme', next)
    this._apply()
    this._emit()
  }

  _handleSystemChange = () => {
    if (this.theme === 'system') {
      this._apply()
      this._emit()
    }
  }

  _resolveTheme = () => {
    if (this.theme === 'system') {
      return this.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return this.theme
  }

  _apply = () => {
    const current = this._resolveTheme()
    this.document.documentElement.dataset.theme = current
    const link = this.document.getElementById('favicon')
    if (link && this.icons) {
      link.href = current === 'dark' ? this.icons.dark : this.icons.light
    }
  }

  _emit = () => {
    for (const cb of this.listeners) cb()
  }
}

export function createThemeService({
  storage = window.localStorage,
  matchMedia = window.matchMedia,
  document = window.document,
  icons,
} = {}) {
  const service = new ThemeService({ storage, matchMedia, document, icons })
  service._apply()
  return service
}

export { ThemeService }
