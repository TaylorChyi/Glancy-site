import { useEffect, useState } from 'react'
import { apiRequest } from '../../api/client.js'
import { API_PATHS } from '../../config/api.js'
import { useLanguage } from '../../LanguageContext.jsx'

function LogLevelSelector({ onError }) {
  const { t } = useLanguage()
  const [level, setLevel] = useState('info')

  const loadLevel = () => {
    apiRequest(API_PATHS.logLevel)
      .then((data) => setLevel(data.level || 'info'))
      .catch((err) => onError && onError(err.message))
  }

  useEffect(() => {
    loadLevel()
  }, [])

  const updateLevel = async () => {
    onError && onError('')
    try {
      await apiRequest(API_PATHS.logLevel, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level })
      })
      loadLevel()
    } catch (err) {
      onError && onError(err.message)
    }
  }

  return (
    <>
      <h3>Log Level</h3>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="debug">debug</option>
        <option value="info">info</option>
        <option value="warn">warn</option>
        <option value="error">error</option>
      </select>
      <button onClick={updateLevel}>{t.saveButton}</button>
    </>
  )
}

export default LogLevelSelector
