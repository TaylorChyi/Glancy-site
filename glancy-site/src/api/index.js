import { createApiClient } from './client.js'
import { createChatApi } from './chat.js'
import { createWordsApi } from './words.js'
import { createLocaleApi } from './locale.js'
import { createSearchRecordsApi } from './searchRecords.js'

const request = createApiClient()

const api = {
  ...createChatApi(request),
  ...createWordsApi(request),
  ...createLocaleApi(request),
  ...createSearchRecordsApi(request)
}

export default api
