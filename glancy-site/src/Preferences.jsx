import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'

function Preferences() {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('en')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    fetch(API_PATHS.preferences)
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data.language || 'en')
        setTheme(data.theme || 'system')
      })
      .catch(() => {})
  }, [setTheme])

  const handleSave = async (e) => {
    e.preventDefault()
    await fetch(API_PATHS.preferences, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, theme })
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
          <input value={language} onChange={(e) => setLanguage(e.target.value)} />
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
