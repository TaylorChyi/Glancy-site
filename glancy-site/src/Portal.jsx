import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'

function Portal() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({})
  const [config, setConfig] = useState([])
  const [configKey, setConfigKey] = useState('')
  const [configValue, setConfigValue] = useState('')
  const [logLevel, setLogLevel] = useState('info')
  const [recipients, setRecipients] = useState([])
  const [newRecipient, setNewRecipient] = useState('')
  const [error, setError] = useState('')

  const loadStats = () => {
    fetch(API_PATHS.stats)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
  }

  const loadConfig = () => {
    fetch(API_PATHS.config)
      .then((res) => res.json())
      .then((data) => setConfig(Object.entries(data)))
      .catch(() => {})
  }

  const loadLogLevel = () => {
    fetch(API_PATHS.logLevel)
      .then((res) => res.json())
      .then((data) => setLogLevel(data.level || 'info'))
      .catch(() => {})
  }

  const loadRecipients = () => {
    fetch(API_PATHS.alertsRecipients)
      .then((res) => res.json())
      .then((data) => setRecipients(data))
      .catch(() => {})
  }

  const addConfig = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const resp = await fetch(API_PATHS.config, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: configKey, value: configValue })
    })
      if (!resp.ok) {
        const text = await resp.text()
        setError(text || 'Request failed')
        return
      }
      setConfigKey('')
      setConfigValue('')
      loadConfig()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateLogLevel = async () => {
    setError('')
    try {
      const resp = await fetch(API_PATHS.logLevel, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: logLevel })
      })
      if (!resp.ok) {
        const text = await resp.text()
        setError(text || 'Request failed')
        return
      }
      loadLogLevel()
    } catch (err) {
      setError(err.message)
    }
  }

  const addRecipient = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const resp = await fetch(API_PATHS.alertsRecipients, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newRecipient })
      })
      if (!resp.ok) {
        const text = await resp.text()
        setError(text || 'Request failed')
        return
      }
      setNewRecipient('')
      loadRecipients()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteRecipient = async (email) => {
    setError('')
    try {
      const resp = await fetch(`${API_PATHS.alertsRecipients}/${encodeURIComponent(email)}`, {
        method: 'DELETE'
      })
      if (!resp.ok) {
        const text = await resp.text()
        setError(text || 'Request failed')
        return
      }
      loadRecipients()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadStats()
    loadConfig()
    loadLogLevel()
    loadRecipients()
  }, [])

  return (
    <div className="App">
      <h2>{t.adminPortal}</h2>
      <p>{t.adminWelcome}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>{t.totalUsers}: {stats.total}</p>
      <p>{t.dailyActive}: {stats.daily}</p>
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
          value={configKey}
          onChange={(e) => setConfigKey(e.target.value)}
        />
        <input
          placeholder="value"
          value={configValue}
          onChange={(e) => setConfigValue(e.target.value)}
        />
        <button type="submit">{t.saveButton}</button>
      </form>

      <h3>Log Level</h3>
      <select value={logLevel} onChange={(e) => setLogLevel(e.target.value)}>
        <option value="debug">debug</option>
        <option value="info">info</option>
        <option value="warn">warn</option>
        <option value="error">error</option>
      </select>
      <button onClick={updateLogLevel}>{t.saveButton}</button>

      <h3>Email Recipients</h3>
      <ul>
        {recipients.map((r) => (
          <li key={r}>
            {r}
            <button type="button" onClick={() => deleteRecipient(r)}>
              {t.deleteButton}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={addRecipient}>
        <input
          placeholder="email"
          value={newRecipient}
          onChange={(e) => setNewRecipient(e.target.value)}
        />
        <button type="submit">{t.saveButton}</button>
      </form>
    </div>
  )
}

export default Portal
