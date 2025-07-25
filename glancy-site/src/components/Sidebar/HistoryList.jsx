import { useEffect, useState } from 'react'
import { useHistory, useFavorites, useUser } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import ListItem from '../ListItem/ListItem.jsx'
import './Sidebar.css'
import useOutsideToggle from '../../hooks/useOutsideToggle.js'

function HistoryList({ onSelect }) {
  const { history, loadHistory, removeHistory, favoriteHistory } = useHistory()
  const { toggleFavorite } = useFavorites()
  const { user } = useUser()
  const [openIndex, setOpenIndex] = useState(null)
  const { ref: listRef, open } = useOutsideToggle(false)
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
          <ListItem
            key={i}
            text={h}
            onClick={() => onSelect && onSelect(h)}
            actions={(
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
            )}
          />
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
