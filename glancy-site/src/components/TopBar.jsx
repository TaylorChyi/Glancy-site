import { useTheme } from '../ThemeContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import { useIsMobile } from '../utils.js'
import lightIcon from '../assets/glancy-web-light.svg'
import darkIcon from '../assets/glancy-web-dark.svg'
import TopBarActions from './TopBarActions.jsx'
import './TopBar.css'

function TopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false,
  onOpenSidebar
}) {
  const isMobile = useIsMobile()
  const { resolvedTheme } = useTheme()
  const { lang } = useLanguage()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon
  const text = term || (isMobile ? (lang === 'zh' ? '格律词典' : 'Glancy') : '')

  return (
    <header className="topbar">
      <button className="topbar-btn" onClick={onOpenSidebar}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
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
      <div className="term-text">{text}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </header>
  )
}

export default TopBar
