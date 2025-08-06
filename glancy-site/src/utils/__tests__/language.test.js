import { detectWordLanguage } from '../language.js'
import { detectWordLanguage as detectWordLanguageFromIndex } from '../index.js'

describe('detectWordLanguage', () => {
  test('identifies Chinese text', () => {
    expect(detectWordLanguage('汉字')).toBe('CHINESE')
  })

  test('identifies English text', () => {
    expect(detectWordLanguage('hello')).toBe('ENGLISH')
  })

  test('is exported via index', () => {
    expect(detectWordLanguageFromIndex('hello')).toBe('ENGLISH')
  })
})
