import { useState, useRef, useEffect } from 'react'
import ModelSelector from './Toolbar/ModelSelector.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import styles from './TopBarCommon.module.css'

function TopBarActions({ favorited = false, onToggleFavorite, canFavorite = false }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { t } = useLanguage()
  const { user } = useUser()

  useEffect(() => {
    function handlePointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('pointerdown', handlePointerDown)
    }
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  if (!user) return null

  return (
    <div className={styles['topbar-right']}>
      {canFavorite && (
        <button type="button" className={styles['favorite-toggle']} onClick={onToggleFavorite}>
          {favorited ? '★' : '☆'}
        </button>
      )}
      <ModelSelector />
      <div className={styles['more-menu']} ref={menuRef}>
        <button type="button" className={styles['more-btn']} onClick={() => setOpen(!open)}>
          ⋮
        </button>
        {open && (
          <div className={styles.menu}>
            <button type="button">
              <span className={styles.icon}>🔗</span>
              {t.share}
            </button>
            <button type="button">
              <span className={styles.icon}>🚩</span>
              {t.report}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBarActions
