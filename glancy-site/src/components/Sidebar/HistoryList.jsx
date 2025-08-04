import { useEffect, useState } from 'react'
import { useHistory, useFavorites, useUser } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import ListItem from '../ListItem/ListItem.jsx'
import styles from './Sidebar.module.css'
import useOutsideToggle from '../../hooks/useOutsideToggle.js'
import {
  EllipsisVerticalIcon,
  StarSolidIcon,
  TrashIcon
} from '../Icon'

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
                  <EllipsisVerticalIcon width={16} height={16} />
                </button>
                {openIndex === i && (
                  <div className={styles['history-menu']}>
                    <button
                      type="button"
                      title={t.favoriteAction}
                      onClick={(e) => {
                        e.stopPropagation()
                        favoriteHistory(h, user)
                        toggleFavorite(h)
                        setOpenIndex(null)
                      }}
                    >
                      <StarSolidIcon width={16} height={16} className={styles.icon} />
                    </button>
                    <button
                      type="button"
                      title={t.deleteAction}
                      className={styles['delete-btn']}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeHistory(h, user)
                        setOpenIndex(null)
                      }}
                    >
                      <TrashIcon width={16} height={16} className={styles.icon} />
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
