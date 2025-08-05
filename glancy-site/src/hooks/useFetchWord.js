import { useApiResource } from '@/hooks/useApiResource.js'
import { detectWordLanguage, clientNameFromModel } from '@/utils/index.js'

export function useFetchWord() {
  const { fetchWord } = useApiResource('words')

  const fetchWordWithHandling = async ({ user, term, model }) => {
    const language = detectWordLanguage(term)
    try {
      const data = await fetchWord({
        userId: user.id,
        term,
        language,
        model: clientNameFromModel(model),
        token: user.token
      })
      return { data, error: null, language }
    } catch (error) {
      return { data: null, error, language }
    }
  }

  return { fetchWordWithHandling }
}
