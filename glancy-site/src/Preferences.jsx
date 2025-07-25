import { useState, useEffect } from 'react'
import './App.css'
import styles from './Preferences.module.css'
import { useLanguage } from './LanguageContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import { useUser } from './context/AppContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { useApi } from './hooks/useApi.js'

function Preferences() {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const api = useApi()
  const [sourceLang, setSourceLang] = useState(
    localStorage.getItem('sourceLang') || 'auto'
  )
  const [targetLang, setTargetLang] = useState(
    localStorage.getItem('targetLang') || 'ENGLISH'
  )
  const [defaultModel, setDefaultModel] = useState(
    localStorage.getItem('dictionaryModel') || 'model-a'
  )
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    if (!user) return
    api.request(`${API_PATHS.preferences}/user/${user.id}`)
      .then((data) => {
        const sl = data.systemLanguage || 'auto'
        const tl = data.searchLanguage || 'ENGLISH'
        const dm = data.dictionaryModel || 'model-a'
        setSourceLang(sl)
        setTargetLang(tl)
        setDefaultModel(dm)
        localStorage.setItem('sourceLang', sl)
        localStorage.setItem('targetLang', tl)
        localStorage.setItem('dictionaryModel', dm)
        setTheme(data.theme || 'system')
      })
      .catch((err) => {
        console.error(err)
        setPopupMsg(t.fail)
        setPopupOpen(true)
      })
  }, [setTheme, t, user, api])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) return
    await api.request(`${API_PATHS.preferences}/user/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemLanguage: sourceLang,
        searchLanguage: targetLang,
        dictionaryModel: defaultModel,
        theme
      })
    })
    localStorage.setItem('sourceLang', sourceLang)
    localStorage.setItem('targetLang', targetLang)
    localStorage.setItem('dictionaryModel', defaultModel)
    setPopupMsg(t.saveSuccess)
    setPopupOpen(true)
  }

  return (
    <div className="app">
      <h2>{t.prefTitle}</h2>
      <form className={styles['preferences-form']} onSubmit={handleSave}>
        <div>
          <label>{t.prefLanguage}</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="auto">{t.autoDetect}</option>
            <option value="CHINESE">CHINESE</option>
            <option value="ENGLISH">ENGLISH</option>
          </select>
        </div>
        <div>
          <label>{t.prefSearchLanguage}</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="CHINESE">CHINESE</option>
            <option value="ENGLISH">ENGLISH</option>
          </select>
        </div>
        <div>
          <label>{t.prefDictionaryModel}</label>
          <select
            value={defaultModel}
            onChange={(e) => setDefaultModel(e.target.value)}
          >
            <option value="model-a">Model A</option>
            <option value="model-b">Model B</option>
          </select>
        </div>
        <div>
          <label>{t.prefTheme}</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="system">system</option>
          </select>
        </div>
        <button type="submit">{t.saveButton}</button>
      </form>
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Preferences
