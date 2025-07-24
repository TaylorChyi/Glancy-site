import { extractMessage } from '../utils.js'

/**
 * Create a new API client instance with optional default headers and token.
 *
 * @param {Object} [config]
 * @param {string} [config.token] global auth token
 * @param {Object} [config.headers] additional default headers
 * @returns {Function} request function
 */
export function createApiClient({ token, headers: defaultHeaders = {} } = {}) {
  return async function apiRequest(
    url,
    { token: reqToken, headers = {}, ...options } = {}
  ) {
    const mergedHeaders = { ...defaultHeaders, ...headers }
    const authToken = reqToken ?? token
    if (authToken) mergedHeaders['X-USER-TOKEN'] = authToken

    const resp = await fetch(url, { ...options, headers: mergedHeaders })
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
}

// default instance without preset headers
export const apiRequest = createApiClient()
