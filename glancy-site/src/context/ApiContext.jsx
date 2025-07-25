import { createContext, useContext, useMemo } from 'react'
import { useUser } from './AppContext.jsx'
import { createApi } from '../api/index.js'

const ApiContext = createContext(createApi())

export function ApiProvider({ children }) {
  const { user } = useUser()
  const token = user?.token
  const api = useMemo(() => createApi({ token }), [token])
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApiContext = () => useContext(ApiContext)
