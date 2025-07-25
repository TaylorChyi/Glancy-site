import ModelSelector from './Toolbar'
import { useLanguage } from '../LanguageContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import useOutsideToggle from '../hooks/useOutsideToggle.js'

function TopBarActions({ favorited = false, onToggleFavorite, canFavorite = false }) {
  const { open, setOpen, ref: menuRef } = useOutsideToggle(false)
  const { t } = useLanguage()
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="topbar-right">
      {canFavorite && (
        <button type="button" className="favorite-toggle" onClick={onToggleFavorite}>
          {favorited ? '★' : '☆'}
        </button>
      )}
      <ModelSelector />
      <div className="more-menu" ref={menuRef}>
        <button type="button" className="more-btn" onClick={() => setOpen(!open)}>
          ⋮
        </button>
        {open && (
          <div className="menu">
            <button type="button">
              <span className="icon">🔗</span>
              {t.share}
            </button>
            <button type="button">
              <span className="icon">🚩</span>
              {t.report}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBarActions
