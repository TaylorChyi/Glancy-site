import { ColorTokens } from '../domain/colors'

class ColorService {
  constructor(tokens) {
    this.tokens = tokens
  }

  getSnapshot = () => {
    const styles = getComputedStyle(document.documentElement)
    return Object.fromEntries(
      Object.entries(this.tokens).map(([key, variable]) => [
        key.toLowerCase(),
        styles.getPropertyValue(variable).trim(),
      ]),
    )
  }

  subscribe = (callback) => {
    const observer = new MutationObserver(callback)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }
}

export const colorService = new ColorService(ColorTokens)
