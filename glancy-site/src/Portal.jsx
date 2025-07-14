import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Portal() {
  const { t } = useLanguage()
  return (
    <div className="App">
      <h2>{t.adminPortal}</h2>
      <p>{t.adminWelcome}</p>
    </div>
  )
}

export default Portal
