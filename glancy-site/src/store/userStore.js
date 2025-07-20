import { create } from 'zustand'

const STORAGE_KEY = 'user'

export const useUserStore = create((set) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initialUser = stored ? JSON.parse(stored) : null
  return {
    user: initialUser,
    setUser: (user) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      set({ user })
    },
    clearUser: () => {
      localStorage.removeItem(STORAGE_KEY)
      set({ user: null })
    }
  }
})
