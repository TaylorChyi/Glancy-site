import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'

export const fetchSearchRecords = ({ userId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, {
    headers: { 'X-USER-TOKEN': token }
  })

export const saveSearchRecord = ({ userId, token, term, language }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-USER-TOKEN': token
    },
    body: JSON.stringify({ term, language })
  })

export const clearSearchRecords = ({ userId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}`, {
    method: 'DELETE',
    headers: { 'X-USER-TOKEN': token }
  })

export const deleteSearchRecord = ({ userId, recordId, token }) =>
  apiRequest(`${API_PATHS.searchRecords}/user/${userId}/${recordId}`, {
    method: 'DELETE',
    headers: { 'X-USER-TOKEN': token }
  })

export const favoriteSearchRecord = ({ userId, token, recordId }) =>
  apiRequest(
    `${API_PATHS.searchRecords}/user/${userId}/${recordId}/favorite`,
    {
      method: 'POST',
      headers: { 'X-USER-TOKEN': token }
    }
  )

export const unfavoriteSearchRecord = ({ userId, token, recordId }) =>
  apiRequest(
    `${API_PATHS.searchRecords}/user/${userId}/${recordId}/favorite`,
    {
      method: 'DELETE',
      headers: { 'X-USER-TOKEN': token }
    }
  )
