import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext({
  lang: 'en',
  t: translations.en,
  setLang: () => {}
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [t, setT] = useState(translations.en)

  useEffect(() => {
    fetch('/api/locale')
      .then((res) => res.json())
      .then((data) => {
        if (translations[data.lang]) {
          setLang(data.lang)
          setT(translations[data.lang])
        }
      })
      .catch(() => {})
  }, [])

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
