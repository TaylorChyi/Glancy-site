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
