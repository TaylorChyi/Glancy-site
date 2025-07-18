import { useEffect, useState } from 'react'
import { useLanguage } from '../../LanguageContext.jsx'
import './Sidebar.css'

function HistoryList() {
  const [history, setHistory] = useState([])
  const { t } = useLanguage()

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section">
      <h3>{t.searchHistory}</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
