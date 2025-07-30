import { create } from 'zustand'

interface ModelState {
  model: string
  setModel: (value: string) => void
}

const STORAGE_KEY = 'dictionaryModel'

export const useModelStore = create<ModelState>((set) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initial = stored || 'DEEPSEEK'
  return {
    model: initial,
    setModel: (value: string) => {
      localStorage.setItem(STORAGE_KEY, value)
      set({ model: value })
    }
  }
})
