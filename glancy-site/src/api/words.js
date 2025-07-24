import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'
import { useApi } from '../hooks/useApi.js'

/**
 * Query a word definition
 * @param {Object} opts
 * @param {string|number} opts.userId current user id
 * @param {string} opts.term word to search
 * @param {string} opts.language CHINESE or ENGLISH
 * @param {string} [opts.token] user token for auth header
 */
export function createWordsApi(request = apiRequest) {
  const fetchWord = async ({ userId, term, language, token }) => {
    const params = new URLSearchParams({ userId, term, language })
    return request(`${API_PATHS.words}?${params.toString()}`, { token })
  }

  const fetchWordAudio = async (word) => {
    const resp = await request(
      `${API_PATHS.words}/audio?word=${encodeURIComponent(word)}`
    )
    return resp.blob()
  }

  return { fetchWord, fetchWordAudio }
}

export const { fetchWord, fetchWordAudio } = createWordsApi()

export function useWordsApi() {
  const api = useApi()
  return createWordsApi(api)
}
