import Avatar from '../ui/Avatar.jsx'
import styles from './Header.module.css'
import {
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '../ui/Icon'

function UserMenuDropdown({
  open,
  setOpen,
  t,
  isPro,
  email,
  openProfile,
  openSettings,
  openShortcuts,
  openHelp,
  openUpgrade,
  openLogout
}) {
  if (!open) return null
  return (
    <div className={styles.menu}>
      <div className={styles['menu-header']}>
        <div className={styles.avatar}>
          <Avatar width={32} height={32} />
        </div>
        <div className={styles.email}>{email}</div>
      </div>
      <ul>
        {!isPro && (
          <li onClick={() => openUpgrade()}>
            <ShieldCheckIcon className={styles.icon} width={20} height={20} />
            {t.upgrade}
          </li>
        )}
        <li onClick={openProfile}>
          <AdjustmentsHorizontalIcon className={styles.icon} width={20} height={20} />
          {t.profile}
        </li>
        <li onClick={openSettings}>
          <Cog6ToothIcon className={styles.icon} width={20} height={20} />
          {t.settings}
        </li>
        <li onClick={openShortcuts}>
          <CommandLineIcon className={styles.icon} width={20} height={20} />
          {t.shortcuts}
        </li>
      </ul>
      <ul>
        <li>
          <QuestionMarkCircleIcon className={styles.icon} width={20} height={20} />
          <button
            type="button"
            onClick={() => {
              openHelp()
              setOpen(false)
            }}
            className={styles['menu-btn']}
          >
            {t.help}
          </button>
        </li>
        <li>
          <ArrowRightOnRectangleIcon className={styles.icon} width={20} height={20} />
          <button
            type="button"
            onClick={() => {
              openLogout()
              setOpen(false)
            }}
            className={styles['menu-btn']}
          >
            {t.logout}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenuDropdown
