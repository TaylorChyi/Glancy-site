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
  return apiRequest(`${API_PATHS.words}?${params.toString()}`, {
    headers: token ? { 'X-USER-TOKEN': token } : {}
  })
}

export async function fetchWordAudio(word) {
  const resp = await fetch(`${API_PATHS.words}/audio?word=${encodeURIComponent(word)}`)
  if (!resp.ok) throw new Error('Failed to fetch')
  return resp.blob()
}
