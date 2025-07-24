import { createContext, useContext } from 'react'
import { useUserStore } from '../store/userStore.js'
import { useHistoryStore } from '../store/historyStore.js'
import { useFavoritesStore } from '../store/favoritesStore.js'

const UserContext = createContext(null)
const HistoryContext = createContext(null)
const FavoritesContext = createContext(null)

export function AppProvider({ children }) {
  const userState = useUserStore()
  const historyState = useHistoryStore()
  const favoritesState = useFavoritesStore()

  return (
    <UserContext.Provider value={userState}>
      <HistoryContext.Provider value={historyState}>
        <FavoritesContext.Provider value={favoritesState}>
          {children}
        </FavoritesContext.Provider>
      </HistoryContext.Provider>
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useHistory = () => useContext(HistoryContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext)
