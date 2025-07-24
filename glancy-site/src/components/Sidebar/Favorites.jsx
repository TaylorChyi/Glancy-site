import { useLanguage } from '../../LanguageContext.jsx'
import styles from './Sidebar.module.css'

function Favorites({ onToggle }) {
  const { t } = useLanguage()

  const handleClick = () => {
    if (onToggle) onToggle((v) => !v)
  }

  return (
    <div className={`${styles.sidebarSection} ${styles.favoritesList}`}>
      <h3 className={styles.collectionButton} onClick={handleClick}>
        {t.favorites || 'Favorites'}
      </h3>
    </div>
  )
}

export default Favorites
