import { useUser, useHistory } from '../../context/AppContext.jsx'
import { useLanguage } from '../../LanguageContext.jsx'
import './Header.css'
import Avatar from '../Avatar.jsx'
import { Link } from 'react-router-dom'
import UserMenuButton from './UserMenuButton.jsx'
import UserMenuDropdown from './UserMenuDropdown.jsx'
import UserMenuModals from './UserMenuModals.jsx'

function UserMenu({ size = 24, showName = false }) {
  const { user, clearUser } = useUser()
  const { clearHistory } = useHistory()
  const { t } = useLanguage()
  const username = user?.username || ''
  const isPro =
    user?.member || user?.isPro || (user?.plan && user.plan !== 'free')

  if (!user) {
    return (
      <div className={`header-section user-menu ${showName ? 'with-name' : ''}`}>
        <Avatar width={size} height={size} />
        {showName && (
          <Link to="/login" className="username login-btn">
            {t.navRegister}/{t.navLogin}
          </Link>
        )}
      </div>
    )
  }

  return (
    <UserMenuModals
      isPro={isPro}
      user={user}
      clearUser={clearUser}
      clearHistory={clearHistory}
    >
      {({
        openProfile,
        openSettings,
        openShortcuts,
        openHelp,
        openUpgrade,
        openLogout
      }) => (
        <UserMenuButton
          size={size}
          showName={showName}
          isPro={isPro}
          username={username}
        >
          {({ open, setOpen }) => (
            <UserMenuDropdown
              open={open}
              setOpen={setOpen}
              t={t}
              isPro={isPro}
              username={username}
              openProfile={openProfile}
              openSettings={openSettings}
              openShortcuts={openShortcuts}
              openHelp={openHelp}
              openUpgrade={openUpgrade}
              openLogout={openLogout}
            />
          )}
        </UserMenuButton>
      )}
    </UserMenuModals>
  )
}

export default UserMenu
