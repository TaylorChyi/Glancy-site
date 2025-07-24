import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'

export const fetchSearchRecords = ({ userId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, { token })

export const saveSearchRecord = ({ userId, token, term, language }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ term, language }),
    token
  })

export const clearSearchRecords = ({ userId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, {
    method: 'DELETE',
    token
  })

export const deleteSearchRecord = ({ userId, recordId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}/${recordId}`, {
    method: 'DELETE',
    token
  })

export const favoriteSearchRecord = ({ userId, token, recordId }) =>
  apiRequest(
    `${API_PATHS.searchRecords}/user/${userId}/${recordId}/favorite`,
    {
      method: 'POST',
      token
    }
  )

export const unfavoriteSearchRecord = ({ userId, token, recordId }) =>
  apiRequest(
    `${API_PATHS.searchRecords}/user/${userId}/${recordId}/favorite`,
    {
      method: 'DELETE',
      token
    }
  )
