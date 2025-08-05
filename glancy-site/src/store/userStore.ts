import { create } from 'zustand'
import { safeJSONParse } from '@/utils/index.js'

export interface User {
  id: string
  token: string
  avatar?: string
  [key: string]: unknown
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const STORAGE_KEY = 'user'
export const useUserStore = create<UserState>((set) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initialUser: User | null = stored ? safeJSONParse(stored, null) : null
  return {
    user: initialUser,
    setUser: (user: User) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      set({ user })
    },
    clearUser: () => {
      localStorage.removeItem(STORAGE_KEY)
      set({ user: null })
    }
  }
})
