import { createPersistentStore } from './createPersistentStore.ts'

interface ModelState {
  model: string
  setModel: (value: string) => void
}

export const useModelStore = createPersistentStore<ModelState>({
  key: 'dictionaryModel',
  initializer: (set) => ({
    model: 'DEEPSEEK',
    setModel: (value: string) => {
      set({ model: value })
    }
  }),
  persistOptions: {
    partialize: (state) => ({ model: state.model })
  }
})
