import { useSyncExternalStore } from 'react'
import { colorService } from '../services/ColorService'

export function useColors() {
  return useSyncExternalStore(colorService.subscribe, colorService.getSnapshot)
}
