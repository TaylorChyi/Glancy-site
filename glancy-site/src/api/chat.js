import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'

export const sendChatMessage = (text) =>
  apiRequest(API_PATHS.chat, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
