import ListItem from '@/components/ui/ListItem'
import styles from './App.module.css'

function FavoritesView({ favorites = [], onSelect, onUnfavorite, emptyMessage }) {
  if (!favorites.length) {
    return (
      <div className={styles['display-content']}>
        <div className={styles['display-term']}>{emptyMessage}</div>
      </div>
    )
  }

  return (
    <ul className={styles['favorites-grid-display']}>
      {favorites.map((w, i) => (
        <ListItem
          key={i}
          className={styles['favorite-item']}
          text={w}
          textClassName={styles['favorite-term']}
          onClick={() => onSelect?.(w)}
          actions={(
            <button
              type="button"
              aria-label="unfavorite"
              className={styles['unfavorite-btn']}
              onClick={(e) => {
                e.stopPropagation()
                onUnfavorite?.(w)
              }}
            >
              ○
            </button>
          )}
        />
      ))}
    </ul>
  )
}

export default FavoritesView
