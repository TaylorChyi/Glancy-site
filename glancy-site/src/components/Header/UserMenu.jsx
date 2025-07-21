import { useRef, useState, useEffect } from 'react'
import { useUserStore } from '../../store/userStore.js'
import { useHistoryStore } from '../../store/historyStore.js'
import { useLanguage } from '../../LanguageContext.jsx'
import './Header.css'
import ProTag from './ProTag.jsx'
import Avatar from '../Avatar.jsx'
import AuthModal from '../AuthModal.jsx'
import HelpModal from '../HelpModal.jsx'
import SettingsModal from '../SettingsModal.jsx'
import ShortcutsModal from '../ShortcutsModal.jsx'
import ProfileModal from '../ProfileModal.jsx'
import UpgradeModal from '../UpgradeModal.jsx'

// size 控制触发按钮中头像的尺寸

function UserMenu({ size = 24, showName = false }) {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const menuRef = useRef(null)
  const user = useUserStore((s) => s.user)
  const clearUser = useUserStore((s) => s.clearUser)
  const clearHistory = useHistoryStore((s) => s.clearHistory)
  const { t } = useLanguage()
  const username = user?.username || ''
  const isPro =
    user?.member || user?.isPro || (user?.plan && user.plan !== 'free')

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

  useEffect(() => {
    const handler = () => setShortcutsOpen(true)
    document.addEventListener('open-shortcuts', handler)
    return () => document.removeEventListener('open-shortcuts', handler)
  }, [])

  return (
    <div className="header-section user-menu" ref={menuRef}>
      {user ? (
        <>
          <button onClick={() => setOpen(!open)} className={showName ? 'with-name' : ''}>
            <Avatar width={size} height={size} />
            {isPro && <ProTag />}
            {showName && <span className="username">{username}</span>}
          </button>
          {open && (
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
                  <li onClick={() => setUpgradeOpen(true)}>
                    <span className="icon">💳</span>{t.upgrade}
                  </li>
                )}
                <li onClick={() => setProfileOpen(true)}>
                  <span className="icon">👤</span>{t.profile}
                </li>
                <li onClick={() => setSettingsOpen(true)}>
                  <span className="icon">⚙️</span>{t.settings}
                </li>
                <li onClick={() => setShortcutsOpen(true)}>
                  <span className="icon">⌨️</span>{t.shortcuts}
                </li>
              </ul>
              <ul>
                <li>
                  <span className="icon">❓</span>
                  <button
                    type="button"
                    onClick={() => {
                      setHelpOpen(true)
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
                      clearHistory(user)
                      clearUser()
                      setOpen(false)
                    }}
                    className="menu-btn"
                  >
                    {t.logout}
                  </button>
                </li>
              </ul>
            </div>
          )}
          <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
          {!isPro && (
            <UpgradeModal
              open={upgradeOpen}
              onClose={() => setUpgradeOpen(false)}
            />
          )}
        </>
      ) : (
        <div className={showName ? 'with-name' : ''}>
          <Avatar width={size} height={size} />
          {showName && (
            <>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="username login-btn"
              >
                {t.navRegister}/{t.navLogin}
              </button>
              <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
            </>
          )}
        </div>
      )}
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}

export default UserMenu
