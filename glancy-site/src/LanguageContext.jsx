import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations.js'
import { API_PATHS } from './config/api.js'
import { apiRequest } from './api/client.js'

const LanguageContext = createContext({
  lang: 'zh',
  t: translations.zh,
  setLang: () => {}
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('zh')
  const [t, setT] = useState(translations.zh)

  useEffect(() => {
    apiRequest(API_PATHS.locale)
      .then((data) => {
        if (translations[data.lang]) {
          setLang(data.lang)
          setT(translations[data.lang])
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    document.title = t.welcomeTitle
    document.documentElement.lang = lang
  }, [lang, t])

  const changeLanguage = (l) => {
    if (translations[l]) {
      setLang(l)
      setT(translations[l])
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
