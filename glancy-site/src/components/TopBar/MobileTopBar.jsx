import { useTheme } from '../../context/ThemeContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import lightIcon from '../../assets/glancy-web-light.svg'
import darkIcon from '../../assets/glancy-web-dark.svg'
import TopBarActions from './TopBarActions.jsx'
import common from './TopBarCommon.module.css'
import styles from './MobileTopBar.module.css'

function MobileTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false,
  onOpenSidebar
}) {
  const { resolvedTheme } = useTheme()
  const { lang } = useLanguage()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon

  return (
    <header className={styles['mobile-topbar']}>
      <button className={styles['topbar-btn']} onClick={onOpenSidebar}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
      <button
        type="button"
        className={`${common['back-btn']} ${showBack ? styles.visible : styles.hidden}`}
        onClick={onBack}
      >
        ←
      </button>
      <div className={`${common['term-text']} ${styles['term-text']}`}>{term || (lang === 'zh' ? '格律词典' : 'Glancy')}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </header>
  )
}

export default MobileTopBar
