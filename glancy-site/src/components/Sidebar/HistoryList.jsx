import { useEffect, useState, useRef } from 'react'
import { useHistory, useFavorites, useUser } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import styles from './Sidebar.module.css'

function HistoryList({ onSelect }) {
  const { history, loadHistory, removeHistory, favoriteHistory } = useHistory()
  const { toggleFavorite } = useFavorites()
  const { user } = useUser()
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
    <div className={`${styles['sidebar-section']} ${styles['history-list']}`} ref={listRef}>
      <ul>
        {history.map((h, i) => (
          <li key={i} onClick={() => onSelect && onSelect(h)}>
            <span className={styles['history-term']}>
              {h}
            </span>
            <div className={styles['history-action-wrapper']}>
              <button
                type="button"
                className={styles['history-action']}
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenIndex(openIndex === i ? null : i)
                }}
              >
                ⋮
              </button>
              {openIndex === i && (
                <div className={styles['history-menu']}>
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
                    className={styles['delete-btn']}
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
