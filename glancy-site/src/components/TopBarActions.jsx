import ModelSelector from './Toolbar'
import { useLanguage } from '../LanguageContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import useOutsideToggle from '../hooks/useOutsideToggle.js'
import common from './TopBarCommon.module.css'
import {
  EllipsisVerticalIcon,
  StarIcon,
  StarSolidIcon,
  LinkIcon,
  FlagIcon
} from './ui/Icon'

function TopBarActions({ favorited = false, onToggleFavorite, canFavorite = false }) {
  const { open, setOpen, ref: menuRef } = useOutsideToggle(false)
  const { t } = useLanguage()
  const { user } = useUser()

  if (!user) return null

  return (
    <div className={common['topbar-right']}>
      {canFavorite && (
        <button type="button" className={common['favorite-toggle']} onClick={onToggleFavorite}>
          {favorited ? (
            <StarSolidIcon width={24} height={24} />
          ) : (
            <StarIcon width={24} height={24} />
          )}
        </button>
      )}
      <ModelSelector />
      <div className={common['more-menu']} ref={menuRef}>
        <button type="button" className={common['more-btn']} onClick={() => setOpen(!open)}>
          <EllipsisVerticalIcon width={20} height={20} />
        </button>
        {open && (
          <div className={common.menu}>
            <button type="button">
              <LinkIcon className={common.icon} width={16} height={16} />
              {t.share}
            </button>
            <button type="button">
              <FlagIcon className={common.icon} width={16} height={16} />
              {t.report}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBarActions
