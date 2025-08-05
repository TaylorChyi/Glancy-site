import { API_PATHS } from '@/config/api.js'
import { apiRequest } from './client.js'

export function createLocaleApi(request = apiRequest) {
  const getLocale = () => request(API_PATHS.locale)
  return { getLocale }
}

export const { getLocale } = createLocaleApi()
