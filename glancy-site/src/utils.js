import { useState, useEffect } from 'react'

export function extractMessage(text) {
  if (!text) return ''
  try {
    const data = JSON.parse(text)
    if (data && typeof data === 'object') {
      return data.message || text
    }
  } catch {
    // not JSON, ignore
  }
  return text
}

export function safeJSONParse(str, defaultValue = null) {
  try {
    return JSON.parse(str)
  } catch {
    return defaultValue
  }
}

export function getModifierKey() {
  const platform =
    navigator.userAgentData?.platform || navigator.platform || ''
  return /Mac|iPhone|iPod|iPad/i.test(platform) ? 'Command \u2318' : 'Ctrl \u2303'
}

export function useIsMobile(maxWidth = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false
  )

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= maxWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [maxWidth])

  return isMobile
}

export function detectWordLanguage(text) {
  return /[\u4e00-\u9fff]/.test(text) ? 'CHINESE' : 'ENGLISH'
}
