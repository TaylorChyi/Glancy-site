import { useEffect, useState } from 'react'
import { useHistoryStore } from '../../store/historyStore.js'
import { useFavoritesStore } from '../../store/favoritesStore.js'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function HistoryList({ onSelect }) {
  const history = useHistoryStore((s) => s.history)
  const loadHistory = useHistoryStore((s) => s.loadHistory)
  const removeHistory = useHistoryStore((s) => s.removeHistory)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const user = useUserStore((s) => s.user)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section history-list">
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            <span className="history-term" onClick={() => onSelect && onSelect(h)}>
              {h}
            </span>
            <button
              type="button"
              className="history-action"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              ⋮
            </button>
            {openIndex === i && (
              <div className="history-menu">
                <button type="button" onClick={() => { toggleFavorite(h); setOpenIndex(null) }}>
                  ★ 收藏
                </button>
                <button type="button" onClick={() => { removeHistory(h); setOpenIndex(null) }}>
                  删除
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
