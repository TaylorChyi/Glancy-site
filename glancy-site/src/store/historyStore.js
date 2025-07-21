import { create } from 'zustand'
import {
  fetchSearchRecords,
  saveSearchRecord,
  clearSearchRecords
} from '../api/searchRecords.js'

const STORAGE_KEY = 'searchHistory'

export const useHistoryStore = create((set, get) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initial = stored ? JSON.parse(stored) : []
  return {
    history: initial,
    loadHistory: async (user) => {
      if (user) {
        try {
          const records = await fetchSearchRecords({
            userId: user.id,
            token: user.token
          })
          const terms = records.map((r) => r.term)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(terms))
          set({ history: terms })
        } catch {
          // fallback to local storage
        }
      } else {
        const stored = localStorage.getItem(STORAGE_KEY)
        set({ history: stored ? JSON.parse(stored) : [] })
      }
    },
    addHistory: async (term, user, language) => {
      if (user) {
        saveSearchRecord({ userId: user.id, token: user.token, term, language }).catch(() => {})
      }
      const unique = Array.from(new Set([term, ...get().history])).slice(0, 20)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unique))
      set({ history: unique })
    },
    clearHistory: async (user) => {
      if (user) {
        clearSearchRecords({ userId: user.id, token: user.token }).catch(() => {})
      }
      localStorage.removeItem(STORAGE_KEY)
      set({ history: [] })
    },
    removeHistory: (term) => {
      const updated = get().history.filter((t) => t !== term)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      set({ history: updated })
    }
  }
})
