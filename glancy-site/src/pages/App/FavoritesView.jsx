import ListItem from '@/components/ui/ListItem'
import EmptyState from '@/components/ui/EmptyState'

function FavoritesView({ favorites = [], onSelect, onUnfavorite, emptyMessage }) {
  if (!favorites.length) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <ul className="favorites-grid-display">
      {favorites.map((w, i) => (
        <ListItem
          key={i}
          className="favorite-item"
          text={w}
          textClassName="favorite-term"
          onClick={() => onSelect?.(w)}
          actions={(
            <button
              type="button"
              aria-label="unfavorite"
              className="unfavorite-btn"
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
