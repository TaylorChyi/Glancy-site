import { useEffect, useState } from 'react'
import { useHistory, useFavorites, useUser } from '@/context/AppContext.jsx'
import { useLanguage } from '@/context/LanguageContext.jsx'
import ListItem from '@/components/ui/ListItem/ListItem.jsx'
import styles from './Sidebar.module.css'
import useOutsideToggle from '@/hooks/useOutsideToggle.js'
import ThemeIcon from '@/components/ui/Icon'

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
    <div className={`${styles['sidebar-section']} ${styles['history-list']}`} ref={listRef}>
      <ul>
        {history.map((h, i) => (
          <ListItem
            key={i}
            text={h}
            onClick={() => onSelect && onSelect(h)}
            actions={(
              <div className={styles['history-action-wrapper']}>
                <button
                  type="button"
                  className={styles['history-action']}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenIndex(openIndex === i ? null : i)
                  }}
                >
                  <ThemeIcon name="ellipsis-vertical" width={16} height={16} />
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
                      <ThemeIcon name="star-solid" width={16} height={16} className={styles.icon} /> {t.favoriteAction}
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
                      <ThemeIcon name="trash" width={16} height={16} className={styles.icon} /> {t.deleteAction}
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
