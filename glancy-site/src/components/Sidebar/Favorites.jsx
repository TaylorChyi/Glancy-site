import { useLanguage } from '../../LanguageContext.jsx'
import './Sidebar.css'

function Favorites({ onToggle }) {
  const { t } = useLanguage()

  const handleClick = () => {
    if (onToggle) onToggle((v) => !v)
  }

  return (
    <div className="sidebar-section favorites-list">
      <h3 className="collection-button" onClick={handleClick}>
        {t.favorites || 'Favorites'}
      </h3>
    </div>
  )
}

export default Favorites
