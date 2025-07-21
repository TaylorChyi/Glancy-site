import { create } from 'zustand'

const STORAGE_KEY = 'favorites'

export const useFavoritesStore = create((set, get) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initial = stored ? JSON.parse(stored) : []
  return {
    favorites: initial,
    toggleFavorite: (term) => {
      const list = get().favorites
      const updated = list.includes(term)
        ? list.filter((t) => t !== term)
        : [...list, term]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      set({ favorites: updated })
    }
  }
})
