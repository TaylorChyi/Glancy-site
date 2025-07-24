import './DesktopTopBar.css'
import './TopBarCommon.css'
import './Header/Header.css'
import TopBarActions from './TopBarActions.jsx'

function DesktopTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false
}) {

  return (
    <header className="desktop-topbar">
      <button
        type="button"
        className="back-btn"
        onClick={onBack}
        style={{
          visibility: showBack ? 'visible' : 'hidden',
          pointerEvents: showBack ? 'auto' : 'none'
        }}
      >
        ←
      </button>
      <div className="term-text">{term}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </header>
  )
}

export default DesktopTopBar
