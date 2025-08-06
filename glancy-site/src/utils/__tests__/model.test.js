import { clientNameFromModel } from '../model.js'
import { clientNameFromModel as clientNameFromModelFromIndex } from '../index.js'

describe('clientNameFromModel', () => {
  test('extracts client name in lowercase', () => {
    expect(clientNameFromModel('GPT_3.5')).toBe('gpt')
  })

  test('returns empty string for falsy model', () => {
    expect(clientNameFromModel()).toBe('')
  })

  test('is exported via index', () => {
    expect(clientNameFromModelFromIndex('BERT_LARGE')).toBe('bert')
  })
})
