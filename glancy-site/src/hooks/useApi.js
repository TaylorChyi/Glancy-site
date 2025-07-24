import { useMemo } from 'react'
import { useUser } from '../context/AppContext.jsx'
import { apiRequest } from '../api/client.js'

export function useApi() {
  const { user } = useUser()
  const token = user?.token

  return useMemo(() => {
    return (url, options = {}) => {
      const { token: optToken, ...rest } = options
      const finalToken = optToken ?? token
      return apiRequest(url, { ...rest, token: finalToken })
    }
  }, [token])
}
