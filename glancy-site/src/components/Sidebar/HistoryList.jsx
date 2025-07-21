import { useEffect, useState, useRef } from 'react'
import { useHistoryStore } from '../../store/historyStore.js'
import { useFavoritesStore } from '../../store/favoritesStore.js'
import { useUserStore } from '../../store/userStore.js'
import { useLanguage } from '../../LanguageContext.jsx'
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
  const { t } = useLanguage()

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
          <li key={i} onClick={() => onSelect && onSelect(h)}>
            <span className="history-term">
              {h}
            </span>
            <div className="history-action-wrapper">
              <button
                type="button"
                className="history-action"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenIndex(openIndex === i ? null : i)
                }}
              >
                ⋮
              </button>
              {openIndex === i && (
                <div className="history-menu">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      favoriteHistory(h, user)
                      toggleFavorite(h)
                      setOpenIndex(null)
                    }}
                  >
                    ★ {t.favoriteAction}
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeHistory(h, user)
                      setOpenIndex(null)
                    }}
                  >
                    🗑 {t.deleteAction}
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
