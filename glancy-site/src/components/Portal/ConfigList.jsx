import { useEffect, useState } from 'react'
import { apiRequest } from '../../api/client.js'
import { API_PATHS } from '../../config/api.js'
import { useLanguage } from '../../LanguageContext.jsx'

function ConfigList({ onError }) {
  const { t } = useLanguage()
  const [config, setConfig] = useState([])
  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')

  const loadConfig = () => {
    apiRequest(API_PATHS.config)
      .then((data) => setConfig(Object.entries(data)))
      .catch((err) => onError && onError(err.message))
  }

  useEffect(() => {
    loadConfig()
  }, [])

  const addConfig = async (e) => {
    e.preventDefault()
    onError && onError('')
    try {
      await apiRequest(API_PATHS.config, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput, value: valueInput })
      })
      setKeyInput('')
      setValueInput('')
      loadConfig()
    } catch (err) {
      onError && onError(err.message)
    }
  }

  return (
    <>
      <h3>System Config</h3>
      <ul>
        {config.map(([k, v]) => (
          <li key={k}>
            {k}: {String(v)}
          </li>
        ))}
      </ul>
      <form onSubmit={addConfig}>
        <input
          placeholder="key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <input
          placeholder="value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button type="submit">{t.saveButton}</button>
      </form>
    </>
  )
}

export default ConfigList
