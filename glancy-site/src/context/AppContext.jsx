import { createContext, useContext } from 'react'
import { useUserStore } from '@/store/userStore.ts'
import { useHistoryStore } from '@/store/historyStore.ts'
import { useFavoritesStore } from '@/store/favoritesStore.ts'

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
