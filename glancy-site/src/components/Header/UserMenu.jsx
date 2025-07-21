import { useRef, useState, useEffect } from 'react'
import { useUserStore } from '../../store/userStore.js'
import { useLanguage } from '../../LanguageContext.jsx'
import './Header.css'
import ProTag from './ProTag.jsx'
import Avatar from '../Avatar.jsx'
import AuthModal from '../AuthModal.jsx'
import ProfileModal from '../ProfileModal.jsx'

// size 控制触发按钮中头像的尺寸

function UserMenu({ size = 24, showName = false }) {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef(null)
  const user = useUserStore((s) => s.user)
  const clearUser = useUserStore((s) => s.clearUser)
  const { t } = useLanguage()
  const username = user?.username || ''
  const isPro = user?.isPro

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('click', handleClick)
    }
    return () => document.removeEventListener('click', handleClick)
  }, [open])

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
                <li onClick={() => setProfileOpen(true)}><span className="icon">👤</span>Profile</li>
                <li><span className="icon">⚙️</span>Settings</li>
                <li><span className="icon">⌨️</span>Shortcuts</li>
              </ul>
              <ul>
                <li><span className="icon">❓</span>Help</li>
                <li>
                  <span className="icon">🔑</span>
                  <button
                    type="button"
                    onClick={() => {
                      clearUser()
                      setOpen(false)
                    }}
                    className="menu-btn"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
          <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
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
    </div>
  )
}

export default UserMenu
