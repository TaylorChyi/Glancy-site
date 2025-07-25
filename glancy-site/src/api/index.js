import { createApiClient } from './client.js'
import { createChatApi } from './chat.js'
import { createWordsApi } from './words.js'
import { createLocaleApi } from './locale.js'
import { createSearchRecordsApi } from './searchRecords.js'

export function createApi(config) {
  const request = createApiClient(config)
  return {
    request,
    chat: createChatApi(request),
    words: createWordsApi(request),
    locale: createLocaleApi(request),
    searchRecords: createSearchRecordsApi(request)
  }
}

const api = createApi()
export default api
