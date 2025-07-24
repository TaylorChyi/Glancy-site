import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'

/**
 * Query a word definition
 * @param {Object} opts
 * @param {string|number} opts.userId current user id
 * @param {string} opts.term word to search
 * @param {string} opts.language CHINESE or ENGLISH
 * @param {string} [opts.token] user token for auth header
 */
export async function fetchWord({ userId, term, language, token }) {
  const params = new URLSearchParams({
    userId,
    term,
    language
  })
  return apiRequest(`${API_PATHS.words}?${params.toString()}`, { token })
}

export async function fetchWordAudio(word) {
  const resp = await apiRequest(
    `${API_PATHS.words}/audio?word=${encodeURIComponent(word)}`
  )
  return resp.blob()
}
