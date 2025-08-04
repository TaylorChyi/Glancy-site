import { useCallback } from 'react'
import useOutsideToggle from '../../hooks/useOutsideToggle.js'
import { EllipsisVerticalIcon, StarSolidIcon, TrashIcon } from '../Icon'
import styles from './Sidebar.module.css'

function HistoryItemActions({ term, onFavorite, onDelete, t }) {
  const { open, setOpen, ref } = useOutsideToggle(false)

  const toggleMenu = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(prev => {
      const next = !prev
      console.log('HistoryItemActions: toggle menu', { term, next })
      return next
    })
  }, [setOpen, term])

  const handleFavorite = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('HistoryItemActions: favorite', term)
    onFavorite(term)
    setOpen(false)
  }, [onFavorite, term, setOpen])

  const handleDelete = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('HistoryItemActions: delete', term)
    onDelete(term)
    setOpen(false)
  }, [onDelete, term, setOpen])

  return (
    <div className={styles['history-action-wrapper']} ref={ref}>
      <button
        type="button"
        className={styles['history-action']}
        onClick={toggleMenu}
      >
        <EllipsisVerticalIcon width={16} height={16} />
      </button>
      {open && (
        <div className={styles['history-menu']}>
          <button
            type="button"
            title={t.favoriteAction}
            onClick={handleFavorite}
          >
            <StarSolidIcon width={16} height={16} className={styles.icon} />
          </button>
          <button
            type="button"
            title={t.deleteAction}
            className={styles['delete-btn']}
            onClick={handleDelete}
          >
            <TrashIcon width={16} height={16} className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  )
}

export default HistoryItemActions
