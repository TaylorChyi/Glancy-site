import { API_PATHS } from '@/config/api.js'
import { apiRequest } from './client.js'

export function createLlmApi(request = apiRequest) {
  const fetchModels = async () => request(API_PATHS.llmModels)
  return { fetchModels }
}

export const { fetchModels } = createLlmApi()
