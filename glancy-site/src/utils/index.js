export { extractMessage, safeJSONParse } from './json.js'
export { getModifierKey, useIsMobile } from './device.js'
export { isPresignedUrl, cacheBust } from './url.js'
export { withStopPropagation } from './stopPropagation.js'

export function detectWordLanguage(text) {
  return /[\u4e00-\u9fff]/.test(text) ? 'CHINESE' : 'ENGLISH'
}

export function clientNameFromModel(model) {
  return model ? model.toLowerCase().replace(/_.*/, '') : ''
}
