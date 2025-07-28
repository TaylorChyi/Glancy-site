import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'
import { useApi } from '../hooks/useApi.js'

/**
 * Query a word definition
 * @param {Object} opts
 * @param {string} opts.term word to search
 * @param {string} opts.language CHINESE or ENGLISH
 * @param {string} [opts.token] user token for auth header
 */
export function createWordsApi(request = apiRequest) {
  const fetchWord = async ({ term, language, token }) => {
    const params = new URLSearchParams({ term, language })
    return request(`${API_PATHS.words}?${params.toString()}`, { token })
  }

  const fetchWordAudio = async ({ term, language }) => {
    const params = new URLSearchParams({ term, language })
    const resp = await request(`${API_PATHS.words}/audio?${params.toString()}`)
    return resp.blob()
  }

  return { fetchWord, fetchWordAudio }
}

export const { fetchWord, fetchWordAudio } = createWordsApi()

export function useWordsApi() {
  return useApi().words
}
