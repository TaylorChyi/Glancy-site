import { Link } from 'react-router-dom'
import './Header.css'
import { useLanguage } from '../../LanguageContext.jsx'

function SettingsMenu() {
  const { t } = useLanguage()
  return (
    <div className="header-section">
      <Link to="/preferences">{t.settings}</Link>
    </div>
  )
}

export default SettingsMenu
