import { useEffect } from 'react'
import { useHistoryStore } from '../../store/historyStore.js'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function HistoryList() {
  const history = useHistoryStore((s) => s.history)
  const loadHistory = useHistoryStore((s) => s.loadHistory)
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section history-list">
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
