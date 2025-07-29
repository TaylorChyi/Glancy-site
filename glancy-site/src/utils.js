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

export function isPresignedUrl(url) {
  if (!url || !url.includes('?')) return false
  const query = url.split('?')[1]
  return /(?:^|&)Signature=/.test(query) || /(?:^|&)OSSAccessKeyId=/.test(query)
}

export function cacheBust(url) {
  if (!url) return url
  if (url.includes('_v=')) return url
  if (isPresignedUrl(url)) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}_v=${Date.now()}`
}
