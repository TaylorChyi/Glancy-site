import Avatar from '../Avatar.jsx'
import ProTag from './ProTag.jsx'
import styles from './Header.module.css'

function UserMenuDropdown({
  open,
  setOpen,
  t,
  isPro,
  username,
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
            <span className={styles.icon}>🛡️</span>
            {t.upgrade}
          </li>
        )}
        <li onClick={openProfile}>
          <span className={styles.icon}>🎚️</span>
          {t.profile}
        </li>
        <li onClick={openSettings}>
          <span className={styles.icon}>⚙️</span>
          {t.settings}
        </li>
        <li onClick={openShortcuts}>
          <span className={styles.icon}>⌘</span>
          {t.shortcuts}
        </li>
      </ul>
      <ul>
        <li>
          <span className={styles.icon}>❓</span>
          <button
            type="button"
            onClick={() => {
              openHelp()
              setOpen(false)
            }}
            className={styles['menu-btn']}
          >
            {t.help}
            <span className={styles.arrow}>›</span>
          </button>
        </li>
        <li>
          <span className={styles.icon}>🚪</span>
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
      <div className={styles['menu-footer']}>
        <div className={styles.avatar}>
          <Avatar width={24} height={24} />
          {isPro && <ProTag small />}
        </div>
        <div className={styles.username}>{username}</div>
      </div>
    </div>
  )
}

export default UserMenuDropdown
