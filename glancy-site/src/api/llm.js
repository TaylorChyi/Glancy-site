import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'
import { useApi } from '../hooks/useApi.js'

export function createLlmApi(request = apiRequest) {
  const fetchModels = async () => request(API_PATHS.llmModels)
  return { fetchModels }
}

export const { fetchModels } = createLlmApi()

export function useLlmApi() {
  return useApi().llm
}
