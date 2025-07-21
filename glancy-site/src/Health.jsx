import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import { apiRequest } from './api/client.js'

function Health() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('')

  const check = useCallback(() => {
    apiRequest(API_PATHS.ping)
      .then(() => setStatus(t.ok))
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
