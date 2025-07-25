import { useEffect, useState } from 'react'
import { useHistory, useFavorites, useUser } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import './Sidebar.css'
import useOutsideToggle from '../../hooks/useOutsideToggle.js'

function HistoryList({ onSelect }) {
  const { history, loadHistory, removeHistory, favoriteHistory } = useHistory()
  const { toggleFavorite } = useFavorites()
  const { user } = useUser()
  const [openIndex, setOpenIndex] = useState(null)
  const { ref: listRef, open, setOpen } = useOutsideToggle(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) {
      setOpenIndex(null)
    }
  }, [open])

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
                  const isOpen = openIndex === i
                  setOpenIndex(isOpen ? null : i)
                  setOpen(!isOpen)
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
                      setOpen(false)
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
                      setOpen(false)
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
