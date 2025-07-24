import styles from './DesktopTopBar.module.css'
import common from './TopBarCommon.module.css'
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
    <header className={styles.desktopTopbar}>
      <button
        type="button"
        className={common.backBtn}
        onClick={onBack}
        style={{
          visibility: showBack ? 'visible' : 'hidden',
          pointerEvents: showBack ? 'auto' : 'none'
        }}
      >
        ←
      </button>
      <div className={common.termText}>{term}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </header>
  )
}

export default DesktopTopBar
