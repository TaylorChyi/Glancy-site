import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Health() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('')

  const check = useCallback(() => {
    fetch('/api/ping')
      .then((res) => setStatus(res.ok ? t.ok : t.fail))
      .catch(() => setStatus(t.fail))
  }, [t])

  useEffect(() => {
    check()
  }, [check])

  return (
    <div className="App">
      <h2>{t.healthTitle}</h2>
      <p>{status}</p>
      <button onClick={check}>{t.refresh}</button>
    </div>
  )
}

export default Health
