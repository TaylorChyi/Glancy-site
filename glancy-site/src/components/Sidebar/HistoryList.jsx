import { useEffect, useState, useCallback } from 'react'
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
  const {
    ref: listRef,
    open,
    setOpen
  } = useOutsideToggle(false)
  const { t } = useLanguage()

  const closeMenu = useCallback(() => {
    setOpen(false)
    setOpenIndex(null)
  }, [setOpen, setOpenIndex])

  const toggleMenu = useCallback((e, index) => {
    e.stopPropagation()
    setOpenIndex(prev => {
      const nextIndex = prev === index ? null : index
      setOpen(nextIndex !== null)
      return nextIndex
    })
  }, [setOpen, setOpenIndex])

  const handleFavorite = useCallback((e, item) => {
    e.stopPropagation()
    favoriteHistory(item, user)
    toggleFavorite(item)
    closeMenu()
  }, [favoriteHistory, toggleFavorite, user, closeMenu])

  const handleDelete = useCallback((e, item) => {
    e.stopPropagation()
    removeHistory(item, user)
    closeMenu()
  }, [removeHistory, user, closeMenu])

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
                  onClick={(e) => toggleMenu(e, i)}
                >
                  <EllipsisVerticalIcon width={16} height={16} />
                </button>
                {openIndex === i && (
                  <div className={styles['history-menu']}>
                    <button
                      type="button"
                      title={t.favoriteAction}
                      onClick={(e) => handleFavorite(e, h)}
                    >
                      <StarSolidIcon width={16} height={16} className={styles.icon} />
                    </button>
                    <button
                      type="button"
                      title={t.deleteAction}
                      className={styles['delete-btn']}
                      onClick={(e) => handleDelete(e, h)}
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
