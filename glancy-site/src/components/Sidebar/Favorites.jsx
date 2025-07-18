import { useLanguage } from '../../LanguageContext.jsx'
import './Sidebar.css'

function Favorites() {
  const { t } = useLanguage()
  return (
    <div className="sidebar-section">
      <h3>{t.favorites || 'Favorites'}</h3>
      <p>No favorites yet.</p>
    </div>
  )
}

export default Favorites
