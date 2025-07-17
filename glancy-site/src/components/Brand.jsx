import { useLanguage } from '../LanguageContext.jsx'
import lightIcon from '../assets/glancy-light.svg'
import darkIcon from '../assets/glancy-dark.svg'

function Brand() {
  const { lang } = useLanguage()
  const hour = new Date().getHours()
  const icon = hour >= 6 && hour < 18 ? lightIcon : darkIcon
  const text = lang === 'zh' ? '格律词典' : 'Glancy'

  return (
    <div className="sidebar-brand">
      <img src={icon} alt="Glancy" />
      <span>{text}</span>
    </div>
  )
}

export default Brand
