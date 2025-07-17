import { useRef, useState, useEffect } from 'react'
import './Header.css'
import ProTag from './ProTag.jsx'
import Avatar from '../Avatar.jsx'

function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const email = 'user@example.com'
  const isPro = true

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
      <button onClick={() => setOpen(!open)}>
        <Avatar width={24} height={24} />
        {isPro && <ProTag />}
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
    </div>
  )
}

export default UserMenu
