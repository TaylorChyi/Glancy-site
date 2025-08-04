import { useEffect, useCallback } from 'react'
import { useHistory, useFavorites, useUser } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import ListItem from '../ListItem/ListItem.jsx'
import styles from './Sidebar.module.css'
import HistoryItemActions from './HistoryItemActions.jsx'

function HistoryList({ onSelect }) {
  const { history, loadHistory, removeHistory, favoriteHistory } = useHistory()
  const { toggleFavorite } = useFavorites()
  const { user } = useUser()
  const { t } = useLanguage()

  const handleFavorite = useCallback((item) => {
    favoriteHistory(item, user)
    toggleFavorite(item)
  }, [favoriteHistory, toggleFavorite, user])

  const handleDelete = useCallback((item) => {
    removeHistory(item, user)
  }, [removeHistory, user])

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  if (history.length === 0) return null

  return (
    <div className={`${styles['sidebar-section']} ${styles['history-list']}`}>
      <ul>
        {history.map((h, i) => (
          <ListItem
            key={i}
            text={h}
            onClick={() => onSelect && onSelect(h)}
            actions={(
              <HistoryItemActions
                term={h}
                t={t}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
              />
            )}
          />
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
