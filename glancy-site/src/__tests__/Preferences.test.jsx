/* eslint-env jest */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { jest } from '@jest/globals'
import { API_PATHS } from '@/config/api.js'

const mockRequest = jest.fn().mockResolvedValue({})
const mockJsonRequest = jest.fn().mockResolvedValue({})
const mockFetchModels = jest.fn().mockResolvedValue(['M1'])
const mockSetTheme = jest.fn()
const mockSetModel = jest.fn()
const mockT = {
  prefTitle: 'Preferences',
  prefLanguage: 'Language',
  prefSearchLanguage: 'Search Language',
  prefDictionaryModel: 'Model',
  prefTheme: 'Theme',
  saveButton: 'Save',
  saveSuccess: 'Saved',
  fail: 'Fail',
  autoDetect: 'Auto',
  CHINESE: 'CHINESE',
  ENGLISH: 'ENGLISH',
  M1: 'M1'
}

jest.unstable_mockModule('@/context/LanguageContext.jsx', () => ({
  useLanguage: () => ({ t: mockT })
}))
jest.unstable_mockModule('@/context/ThemeContext.jsx', () => ({
  useTheme: () => ({ theme: 'light', setTheme: mockSetTheme })
}))
jest.unstable_mockModule('@/context/AppContext.jsx', () => ({
  useUser: () => ({ user: { id: '1', token: 't' } })
}))
jest.unstable_mockModule('@/hooks/useApiResource.js', () => ({
  useApiResource: (resource) => {
    if (resource === 'request') return mockRequest
    if (resource === 'jsonRequest') return mockJsonRequest
    if (resource === 'llm') return { fetchModels: mockFetchModels }
    return {}
  }
}))
jest.unstable_mockModule('@/store/modelStore.ts', () => ({
  useModelStore: () => ({ model: 'M1', setModel: mockSetModel })
}))

const { default: Preferences } = await import('@/pages/preferences')

beforeEach(() => {
  localStorage.clear()
})

test('saves preferences via api', async () => {
  render(<Preferences />)
  await waitFor(() => expect(mockFetchModels).toHaveBeenCalled())
  await waitFor(() => expect(mockRequest).toHaveBeenCalled())
  fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'CHINESE' } })
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))
  await waitFor(() => expect(mockJsonRequest).toHaveBeenCalled())
  expect(mockRequest.mock.calls[0][0]).toBe(`${API_PATHS.preferences}/user/1`)
})
