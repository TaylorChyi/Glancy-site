const CHINESE_CHAR_REGEX = /[\u4e00-\u9fff]/

export function detectWordLanguage(text) {
  return CHINESE_CHAR_REGEX.test(text) ? 'CHINESE' : 'ENGLISH'
}
