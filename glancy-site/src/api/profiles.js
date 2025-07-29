import { API_PATHS } from '../config/api.js'
import { apiRequest } from './client.js'
import { useApi } from '../hooks/useApi.js'

export function createProfilesApi(request = apiRequest) {
  const fetchProfile = ({ userId, token }) =>
    request(`${API_PATHS.profiles}/user/${userId}`, { token })

  const saveProfile = ({ userId, token, profile }) =>
    request(`${API_PATHS.profiles}/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
      token
    })

  return { fetchProfile, saveProfile }
}

export const { fetchProfile, saveProfile } = createProfilesApi()

export function useProfilesApi() {
  return useApi().profiles
}
