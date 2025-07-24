import styles from './DesktopTopBar.module.css'
import commonStyles from './TopBarCommon.module.css'
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
    <header className={styles['desktop-topbar']}>
      <button
        type="button"
        className={commonStyles['back-btn']}
        onClick={onBack}
        style={{
          visibility: showBack ? 'visible' : 'hidden',
          pointerEvents: showBack ? 'auto' : 'none'
        }}
      >
        ←
      </button>
      <div className={commonStyles['term-text']}>{term}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </header>
  )
}

export default DesktopTopBar
