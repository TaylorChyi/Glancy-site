import useMediaQuery from '@/hooks/useMediaQuery.js'

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
  return useMediaQuery(`(max-width: ${maxWidth}px)`)
}

export function detectWordLanguage(text) {
  return /[\u4e00-\u9fff]/.test(text) ? 'CHINESE' : 'ENGLISH'
}

export function clientNameFromModel(model) {
  return model ? model.toLowerCase().replace(/_.*/, '') : ''
}

const PRESIGNED_QUERY_KEYS = ['Signature', 'OSSAccessKeyId']

export function isPresignedUrl(url) {
  if (!url) return false
  try {
    const base =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    const params = new URL(url, base).searchParams
    return PRESIGNED_QUERY_KEYS.some((key) => params.has(key))
  } catch {
    return PRESIGNED_QUERY_KEYS.some((key) =>
      new RegExp(`[?&]${key}=`).test(url)
    )
  }
}

export function cacheBust(url) {
  if (!url) return url
  if (url.includes('_v=')) return url
  if (isPresignedUrl(url)) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}_v=${Date.now()}`
}
