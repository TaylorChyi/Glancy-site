export function clientNameFromModel(model) {
  return model ? model.toLowerCase().replace(/_.*/, '') : ''
}
