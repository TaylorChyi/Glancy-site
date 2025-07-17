import { translations } from '../../translations.js'
import { useLanguage } from '../../LanguageContext.jsx'
import './Sidebar.css'

function LanguageSelector() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="sidebar-section">
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {Object.keys(translations).map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
