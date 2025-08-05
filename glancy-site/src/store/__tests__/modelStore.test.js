import { act } from '@testing-library/react'
import { useModelStore } from '../modelStore.ts'

describe('modelStore', () => {
  beforeEach(() => localStorage.clear())

  test('setModel updates state and storage', () => {
    act(() => useModelStore.getState().setModel('GPT'))
    expect(useModelStore.getState().model).toBe('GPT')
    expect(localStorage.getItem('dictionaryModel')).toBe('GPT')
  })
})
