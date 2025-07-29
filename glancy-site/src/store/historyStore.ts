import { create } from 'zustand'
import api from '../api/index.js'
import { safeJSONParse } from '../utils.js'

import type { User } from './userStore.ts'

interface HistoryState {
  history: string[]
  recordMap: Record<string, string>
  loadHistory: (user?: User | null) => Promise<void>
  addHistory: (term: string, user?: User | null, language?: string) => Promise<void>
  clearHistory: (user?: User | null) => Promise<void>
  removeHistory: (term: string, user?: User | null) => Promise<void>
  favoriteHistory: (term: string, user?: User | null) => Promise<void>
  unfavoriteHistory: (term: string, user?: User | null) => Promise<void>
}

const STORAGE_KEY = 'searchHistory'

export const useHistoryStore = create<HistoryState>((set, get) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initial: string[] = stored ? safeJSONParse(stored, []) : []
  const initialMap: Record<string, string> = {}
  async function refreshHistory(user: User) {
    try {
      const records = await api.searchRecords.fetchSearchRecords({
        userId: user.id,
        token: user.token
      })
      const terms = records.map((r) => r.term)
      const map: Record<string, string> = {}
      records.forEach((r) => {
        if (r.id) map[r.term] = r.id
      })
      const existing = get().history
      const combined = Array.from(new Set([...terms, ...existing]))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combined))
      set((state) => ({
        history: combined,
        recordMap: { ...state.recordMap, ...map }
      }))
    } catch (err) {
      console.error(err)
    }
  }

  return {
    history: initial,
    recordMap: initialMap,
    loadHistory: async (user?: User | null) => {
      if (user) {
        refreshHistory(user)
      } else {
        const stored = localStorage.getItem(STORAGE_KEY)
        set({ history: stored ? JSON.parse(stored) : [], recordMap: {} })
      }
    },
    addHistory: async (term: string, user?: User | null, language?: string) => {
      if (user) {
        try {
          const record = await api.searchRecords.saveSearchRecord({
            userId: user.id,
            token: user.token,
            term,
            language
          })
          set((state) => ({
            recordMap: { ...state.recordMap, [term]: record.id }
          }))
          // refresh history from server to ensure sync
          refreshHistory(user)
        } catch (err) {
          console.error(err)
        }
      }
      const unique = Array.from(new Set([term, ...get().history])).slice(0, 20)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unique))
      set({ history: unique })
    },
    clearHistory: async (user?: User | null) => {
      if (user) {
        api.searchRecords.clearSearchRecords({ userId: user.id, token: user.token }).catch((err) => {
          console.error(err)
        })
      }
      localStorage.removeItem(STORAGE_KEY)
      set({ history: [], recordMap: {} })
    },
    removeHistory: async (term: string, user?: User | null) => {
      if (user) {
        const id = get().recordMap[term]
        if (id) {
          api.searchRecords.deleteSearchRecord({ userId: user.id, recordId: id, token: user.token }).catch((err) => {
            console.error(err)
          })
        }
      }
      const updated = get().history.filter((t) => t !== term)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      set((state) => {
        const map = { ...state.recordMap }
        delete map[term]
        return { history: updated, recordMap: map }
      })
    },
    favoriteHistory: async (term: string, user?: User | null) => {
        const id = get().recordMap[term]
        if (user && id) {
          api.searchRecords.favoriteSearchRecord({ userId: user.id, token: user.token, recordId: id }).catch((err) => {
            console.error(err)
          })
        }
      },
    unfavoriteHistory: async (term: string, user?: User | null) => {
        const id = get().recordMap[term]
        if (user && id) {
          api.searchRecords.unfavoriteSearchRecord({ userId: user.id, token: user.token, recordId: id }).catch((err) => {
            console.error(err)
          })
        }
      }
    }
  })
