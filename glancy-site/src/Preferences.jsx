import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Preferences() {
  const { t } = useLanguage()
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/preferences')
      .then((res) => res.json())
      .then((data) => {
        setLanguage(data.language || 'en')
        setTheme(data.theme || 'light')
      })
      .catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, theme })
    })
    setMessage(t.saveSuccess)
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
          <input value={theme} onChange={(e) => setTheme(e.target.value)} />
        </div>
        <button type="submit">{t.saveButton}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Preferences
