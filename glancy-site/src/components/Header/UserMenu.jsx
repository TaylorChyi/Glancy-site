import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore.js'
import { useLanguage } from '../../LanguageContext.jsx'
import './Header.css'
import ProTag from './ProTag.jsx'
import Avatar from '../Avatar.jsx'

// size 控制触发按钮中头像的尺寸

function UserMenu({ size = 24, showName = false }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const user = useUserStore((s) => s.user)
  const { t } = useLanguage()
  const email = user?.email || ''
  const isPro = !!user

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
            {showName && <span className="username">{email}</span>}
          </button>
          {open && (
            <div className="menu">
              <div className="menu-header">
                <div className="avatar">
                  <Avatar width={32} height={32} />
                  {isPro && <ProTag small />}
                </div>
                <div className="email">{email}</div>
              </div>
              <ul>
                <li><span className="icon">👤</span>Profile</li>
                <li><span className="icon">⚙️</span>Settings</li>
                <li><span className="icon">⌨️</span>Shortcuts</li>
              </ul>
              <ul>
                <li><span className="icon">❓</span>Help</li>
                <li><span className="icon">🔑</span>Log in</li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className={showName ? 'with-name' : ''}>
          <Avatar width={size} height={size} />
          {showName && (
            <Link to="/login" className="username login-btn">
              {t.navRegister}/{t.navLogin}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default UserMenu
