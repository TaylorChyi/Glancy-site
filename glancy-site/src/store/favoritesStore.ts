import { create } from 'zustand'
import { safeJSONParse } from '../utils.js'

interface FavoritesState {
  favorites: string[]
  toggleFavorite: (term: string) => void
}

const STORAGE_KEY = 'favorites'

export const useFavoritesStore = create<FavoritesState>((set, get) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initial: string[] = stored ? safeJSONParse(stored, []) : []
  return {
    favorites: initial,
    toggleFavorite: (term: string) => {
      const list = get().favorites
      const updated = list.includes(term)
        ? list.filter((t) => t !== term)
        : [...list, term]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      set({ favorites: updated })
    }
  }
})
