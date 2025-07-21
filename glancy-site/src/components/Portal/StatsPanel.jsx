import { useEffect, useState } from 'react'
import { apiRequest } from '../../api/client.js'
import { API_PATHS } from '../../config/api.js'
import { useLanguage } from '../../LanguageContext.jsx'

function StatsPanel({ onError }) {
  const { t } = useLanguage()
  const [stats, setStats] = useState({})

  useEffect(() => {
    apiRequest(API_PATHS.stats)
      .then((data) => setStats(data))
      .catch((err) => onError && onError(err.message))
  }, [onError])

  return (
    <>
      <p>{t.totalUsers}: {stats.total}</p>
      <p>{t.dailyActive}: {stats.daily}</p>
    </>
  )
}

export default StatsPanel
