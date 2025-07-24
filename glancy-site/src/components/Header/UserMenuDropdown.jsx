import Avatar from '../Avatar.jsx'
import ProTag from './ProTag.jsx'

function UserMenuDropdown({
  open,
  setOpen,
  t,
  isPro,
  username,
  openProfile,
  openSettings,
  openShortcuts,
  openHelp,
  openUpgrade,
  openLogout
}) {
  if (!open) return null
  return (
    <div className="menu">
      <div className="menu-header">
        <div className="avatar">
          <Avatar width={32} height={32} />
          {isPro && <ProTag small />}
        </div>
        <div className="username">{username}</div>
      </div>
      <ul>
        {!isPro && (
          <li onClick={() => openUpgrade()}>
            <span className="icon">💳</span>
            {t.upgrade}
          </li>
        )}
        <li onClick={openProfile}>
          <span className="icon">👤</span>
          {t.profile}
        </li>
        <li onClick={openSettings}>
          <span className="icon">⚙️</span>
          {t.settings}
        </li>
        <li onClick={openShortcuts}>
          <span className="icon">⌨️</span>
          {t.shortcuts}
        </li>
      </ul>
      <ul>
        <li>
          <span className="icon">❓</span>
          <button
            type="button"
            onClick={() => {
              openHelp()
              setOpen(false)
            }}
            className="menu-btn"
          >
            {t.help}
          </button>
        </li>
        <li>
          <span className="icon">🔑</span>
          <button
            type="button"
            onClick={() => {
              openLogout()
              setOpen(false)
            }}
            className="menu-btn"
          >
            {t.logout}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenuDropdown
