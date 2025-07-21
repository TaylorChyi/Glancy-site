import './Toolbar.css'
import { useLanguage } from '../../LanguageContext.jsx'

function ClearButton({ onClear }) {
  const { t } = useLanguage()
  return (
    <button className="toolbar-section" onClick={onClear}>
      {t.clear}
    </button>
  )
}

export default ClearButton
