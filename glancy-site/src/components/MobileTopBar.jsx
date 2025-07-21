import { useTheme } from '../ThemeContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import lightIcon from '../assets/glancy-light.svg'
import darkIcon from '../assets/glancy-dark.svg'
import UserMenu from './Header/UserMenu.jsx'
import './MobileTopBar.css'

function MobileTopBar({ onToggleFavorites, onToggleHistory }) {
  const { resolvedTheme } = useTheme()
  const { lang } = useLanguage()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon
  const text = lang === 'zh' ? '格律词典' : 'Glancy'
  return (
    <>
      <button className="topbar-btn" onClick={() => window.location.reload()}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
      <button className="topbar-btn" onClick={onToggleFavorites}>⭐</button>
      <button className="topbar-btn" onClick={onToggleHistory}>📜</button>
      <div className="topbar-btn"><UserMenu size={24} /></div>
      <span className="topbar-text">{text}</span>
    </>
  )
}

export default MobileTopBar
