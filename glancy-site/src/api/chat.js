import { API_PATHS } from '../config/api.js'

export async function sendChatMessage(text) {
  const resp = await fetch(API_PATHS.chat, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  if (!resp.ok) throw new Error('Failed to fetch')
  return resp.json()
}
