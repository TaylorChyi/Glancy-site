import { useState } from 'react'
import { useLanguage } from '../../LanguageContext.jsx'
import { useFavoritesStore } from '../../store/favoritesStore.js'
import './Sidebar.css'

function Favorites({ onToggle }) {
  const { t } = useLanguage()
  const favorites = useFavoritesStore((s) => s.favorites)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    const next = !open
    setOpen(next)
    if (onToggle) onToggle(next)
  }

  return (
    <div className={`sidebar-section favorites-list${open ? ' expanded' : ''}`}> 
      <h3 className="collection-button" onClick={handleClick}>
        {t.favorites || 'Favorites'}
      </h3>
      {open && (
        <ul>
          {favorites.length ? (
            favorites.map((w, i) => <li key={i}>{w}</li>)
          ) : (
            <li>No favorites yet.</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Favorites
