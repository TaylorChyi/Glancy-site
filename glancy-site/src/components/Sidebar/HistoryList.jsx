import { useEffect, useState, useRef } from 'react'
import { useHistoryStore } from '../../store/historyStore.js'
import { useFavoritesStore } from '../../store/favoritesStore.js'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function HistoryList({ onSelect }) {
  const history = useHistoryStore((s) => s.history)
  const loadHistory = useHistoryStore((s) => s.loadHistory)
  const removeHistory = useHistoryStore((s) => s.removeHistory)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const favoriteHistory = useHistoryStore((s) => s.favoriteHistory)
  const user = useUserStore((s) => s.user)
  const [openIndex, setOpenIndex] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    function handlePointerDown(e) {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setOpenIndex(null)
      }
    }
    if (openIndex !== null) {
      document.addEventListener('pointerdown', handlePointerDown)
    }
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [openIndex])

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  if (history.length === 0) return null

  return (
    <div className="sidebar-section history-list" ref={listRef}>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            <span className="history-term" onClick={() => onSelect && onSelect(h)}>
              {h}
            </span>
            <div className="history-action-wrapper">
              <button
                type="button"
                className="history-action"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                ⋮
              </button>
              {openIndex === i && (
                <div className="history-menu">
                  <button
                    type="button"
                    onClick={() => {
                      favoriteHistory(h, user)
                      toggleFavorite(h)
                      setOpenIndex(null)
                    }}
                  >
                    ★ 收藏
                  </button>
                  <button type="button" onClick={() => { removeHistory(h, user); setOpenIndex(null) }}>
                    删除
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
