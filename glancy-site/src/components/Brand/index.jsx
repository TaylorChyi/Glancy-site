import { useLanguage } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { GlancyWebLightIcon, GlancyWebDarkIcon } from '../ui/Icon'
import { UserMenu } from '../Header'

function Brand() {
  const { lang } = useLanguage()
  const { resolvedTheme } = useTheme()
  const BrandIcon = resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon
  const text = lang === 'zh' ? '格律词典' : 'Glancy'

  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div className="sidebar-brand">
      <div className="brand-main" onClick={handleClick}>
        <BrandIcon alt="Glancy" />
        <span>{text}</span>
      </div>
      <div className="mobile-user-menu">
        <UserMenu size={28} />
      </div>
    </div>
  )
}

export default Brand
