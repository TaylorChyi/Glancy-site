import { act } from '@testing-library/react'
import { useUserStore } from '@/store/userStore.ts'

describe('userStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('setUser and clearUser persist to storage', () => {
    const user = { id: '1', token: 't' }
    act(() => useUserStore.getState().setUser(user))
    expect(useUserStore.getState().user).toEqual(user)
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user))
    act(() => useUserStore.getState().clearUser())
    expect(useUserStore.getState().user).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})
