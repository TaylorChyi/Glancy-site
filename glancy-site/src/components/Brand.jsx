import { useLanguage } from '../LanguageContext.jsx'
import { useTheme } from '../ThemeContext.jsx'
import lightIcon from '../assets/glancy-light.svg'
import darkIcon from '../assets/glancy-dark.svg'
import UserMenu from './Header/UserMenu.jsx'

function Brand() {
  const { lang } = useLanguage()
  const { resolvedTheme } = useTheme()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon
  const text = lang === 'zh' ? '格律词典' : 'Glancy'

  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div className="sidebar-brand">
      <div className="brand-main" onClick={handleClick}>
        <img src={icon} alt="Glancy" />
        <span>{text}</span>
      </div>
      <div className="mobile-user-menu">
        <UserMenu size={28} />
      </div>
    </div>
  )
}

export default Brand
