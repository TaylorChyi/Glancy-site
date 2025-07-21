import { useEffect } from 'react'
import { useLanguage } from '../../LanguageContext.jsx'
import { useHistoryStore } from '../../store/historyStore.js'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function HistoryList() {
  const history = useHistoryStore((s) => s.history)
  const loadHistory = useHistoryStore((s) => s.loadHistory)
  const user = useUserStore((s) => s.user)
  const { t } = useLanguage()

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section history-list">
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
