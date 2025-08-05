import { useApi } from '@/hooks/useApi.js'

export function useApiResource(resource) {
  return useApi()[resource]
}
