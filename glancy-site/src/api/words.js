import { API_PATHS } from '../config/api.js'

export async function fetchWord(word) {
  const resp = await fetch(`${API_PATHS.words}?word=${encodeURIComponent(word)}`)
  if (!resp.ok) throw new Error('Failed to fetch')
  return resp.json()
}

export async function fetchWordAudio(word) {
  const resp = await fetch(`${API_PATHS.words}/audio?word=${encodeURIComponent(word)}`)
  if (!resp.ok) throw new Error('Failed to fetch')
  return resp.blob()
}
