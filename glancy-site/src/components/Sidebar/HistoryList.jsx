import { useEffect, useState } from 'react'
import './Sidebar.css'

function HistoryList() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section">
      <h3>History</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
