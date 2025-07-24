import { extractMessage } from '../utils.js'

export async function apiRequest(url, options = {}) {
  const resp = await fetch(url, options)
  if (!resp.ok) {
    const text = await resp.text().catch(() => '')
    throw new Error(extractMessage(text) || 'Request failed')
  }
  const contentType = resp.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return resp.json()
  }
  return resp
}
