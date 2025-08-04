import { extractMessage } from '../utils.js'
import logger from '../services/Logger.js'

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

    logger.debug('apiRequest start', { url, options })

    let resp
    try {
      resp = await fetch(url, { ...options, headers: mergedHeaders })
    } catch (error) {
      logger.error('network error', { url, error })
      throw error
    }

    if (!resp.ok) {
      const text = await resp.text().catch((err) => {
        logger.error('response text read failed', { url, err })
        return ''
      })
      logger.error('request failed', { url, status: resp.status })
      throw new Error(extractMessage(text) || 'Request failed')
    }

    const contentType = resp.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await resp.json()
      logger.debug('apiRequest success', { url })
      return data
    }
    logger.debug('apiRequest success', { url })
    return resp
  }
}

// default instance without preset headers
export const apiRequest = createApiClient()
