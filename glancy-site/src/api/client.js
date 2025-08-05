import { extractMessage } from '@/utils/index.js'

/**
 * Create a new API client instance with optional default headers and token.
 *
 * @param {Object} [config]
 * @param {string} [config.token] global auth token
 * @param {Object} [config.headers] additional default headers
 * @param {Function} [config.onUnauthorized] callback when response is 401
 * @returns {Function} request function
 */
export function createApiClient({ token, headers: defaultHeaders = {}, onUnauthorized } = {}) {
  return async function apiRequest(
    url,
    { token: reqToken, headers = {}, ...options } = {}
  ) {
    const mergedHeaders = { ...defaultHeaders, ...headers }
    const authToken = reqToken ?? token
    if (authToken) mergedHeaders['X-USER-TOKEN'] = authToken

    let resp
    try {
      resp = await fetch(url, { ...options, headers: mergedHeaders })
    } catch (err) {
      console.error(err)
      throw new Error('Network error')
    }
    if (!resp.ok) {
      if (resp.status === 401) onUnauthorized?.()
      const text = await resp.text().catch((err) => {
        console.error(err)
        return ''
      })
      throw new Error(extractMessage(text) || 'Request failed')
    }
    const contentType = resp.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return resp.json()
    }
    return resp
  }
}

// default instance without preset headers
export const apiRequest = createApiClient()
