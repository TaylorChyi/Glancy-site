import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import { useUserStore } from './store/userStore.js'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'

function Preferences() {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const user = useUserStore((s) => s.user)
  const [systemLanguage, setSystemLanguage] = useState('en')
  const [searchLanguage, setSearchLanguage] = useState('ENGLISH')
  const [dictionaryModel, setDictionaryModel] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    if (!user) return
    apiRequest(`${API_PATHS.preferences}/user/${user.id}`)
      .then((data) => {
        setSystemLanguage(data.systemLanguage || 'en')
        setSearchLanguage(data.searchLanguage || 'ENGLISH')
        setDictionaryModel(data.dictionaryModel || '')
        setTheme(data.theme || 'system')
      })
      .catch(() => {})
  }, [setTheme, user])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) return
    await apiRequest(`${API_PATHS.preferences}/user/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemLanguage,
        searchLanguage,
        dictionaryModel,
        theme
      })
    })
    setPopupMsg(t.saveSuccess)
    setPopupOpen(true)
  }

  return (
    <div className="App">
      <h2>{t.prefTitle}</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>{t.prefLanguage}</label>
          <input
            value={systemLanguage}
            onChange={(e) => setSystemLanguage(e.target.value)}
          />
        </div>
        <div>
          <label>{t.prefSearchLanguage}</label>
          <select
            value={searchLanguage}
            onChange={(e) => setSearchLanguage(e.target.value)}
          >
            <option value="CHINESE">CHINESE</option>
            <option value="ENGLISH">ENGLISH</option>
          </select>
        </div>
        <div>
          <label>{t.prefDictionaryModel}</label>
          <input
            value={dictionaryModel}
            onChange={(e) => setDictionaryModel(e.target.value)}
          />
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
