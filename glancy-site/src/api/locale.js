import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'

export const getLocale = () => apiRequest(API_PATHS.locale)
