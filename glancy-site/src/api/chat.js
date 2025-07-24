import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'
import { useApi } from '../hooks/useApi.js'

export function createChatApi(request = apiRequest) {
  const sendChatMessage = (text) =>
    request(API_PATHS.chat, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

  return { sendChatMessage }
}

export const { sendChatMessage } = createChatApi()

export function useChatApi() {
  const api = useApi()
  return createChatApi(api)
}
