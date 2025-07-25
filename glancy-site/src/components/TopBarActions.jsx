import ModelSelector from './Toolbar'
import { useLanguage } from '../LanguageContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import useOutsideToggle from '../hooks/useOutsideToggle.js'
import common from './TopBarCommon.module.css'

function TopBarActions({ favorited = false, onToggleFavorite, canFavorite = false }) {
  const { open, setOpen, ref: menuRef } = useOutsideToggle(false)
  const { t } = useLanguage()
  const { user } = useUser()

  if (!user) return null

  return (
    <div className={common['topbar-right']}>
      {canFavorite && (
        <button type="button" className={common['favorite-toggle']} onClick={onToggleFavorite}>
          {favorited ? '★' : '☆'}
        </button>
      )}
      <ModelSelector />
      <div className={common['more-menu']} ref={menuRef}>
        <button type="button" className={common['more-btn']} onClick={() => setOpen(!open)}>
          ⋮
        </button>
        {open && (
          <div className={common.menu}>
            <button type="button">
              <span className={common.icon}>🔗</span>
              {t.share}
            </button>
            <button type="button">
              <span className={common.icon}>🚩</span>
              {t.report}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBarActions
