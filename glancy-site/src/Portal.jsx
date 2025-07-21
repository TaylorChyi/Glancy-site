import { useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import StatsPanel from './components/Portal/StatsPanel.jsx'
import ConfigList from './components/Portal/ConfigList.jsx'
import LogLevelSelector from './components/Portal/LogLevelSelector.jsx'
import RecipientsList from './components/Portal/RecipientsList.jsx'

function Portal() {
  const { t } = useLanguage()
  const [error, setError] = useState('')

  return (
    <div className="App">
      <h2>{t.adminPortal}</h2>
      <p>{t.adminWelcome}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <StatsPanel onError={setError} />
      <ConfigList onError={setError} />
      <LogLevelSelector onError={setError} />
      <RecipientsList onError={setError} />
    </div>
  )
}

export default Portal
