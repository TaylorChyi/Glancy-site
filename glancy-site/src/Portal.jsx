import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Portal() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetch('/api/stats/users')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
  }, [])

  return (
    <div className="App">
      <h2>{t.adminPortal}</h2>
      <p>{t.adminWelcome}</p>
      <p>{t.totalUsers}: {stats.total}</p>
      <p>{t.dailyActive}: {stats.daily}</p>
    </div>
  )
}

export default Portal
