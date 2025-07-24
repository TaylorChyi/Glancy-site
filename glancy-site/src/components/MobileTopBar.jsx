import { useTheme } from '../ThemeContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import lightIcon from '../assets/glancy-web-light.svg'
import darkIcon from '../assets/glancy-web-dark.svg'
import TopBarActions from './TopBarActions.jsx'
import './TopBarCommon.css'
import './MobileTopBar.css'
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
    <>
      <button className="topbar-btn" onClick={onOpenSidebar}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
      <button
        type="button"
        className={`back-btn ${showBack ? styles.visible : styles.hidden}`}
        onClick={onBack}
      >
        ←
      </button>
      <div className="term-text">{term || (lang === 'zh' ? '格律词典' : 'Glancy')}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </>
  )
}

export default MobileTopBar
