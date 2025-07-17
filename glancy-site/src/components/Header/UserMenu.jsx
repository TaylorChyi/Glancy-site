import { useState } from 'react'
import './Header.css'

function UserMenu() {
  const [open, setOpen] = useState(false)
  const email = 'user@example.com'
  const isPro = true

  return (
    <div className="header-section user-menu">
      <button onClick={() => setOpen(!open)}>
        <span role="img" aria-label="user">👤</span>
        {isPro && <span className="pro-tag">PRO</span>}
      </button>
      {open && (
        <div className="menu">
          <div className="menu-header">
            <div className="avatar">
              <span role="img" aria-label="user">👤</span>
              {isPro && <span className="pro-tag-small">PRO</span>}
            </div>
            <div className="email">{email}</div>
          </div>
          <ul>
            <li><span className="icon">⬆️</span>Upgrade plan</li>
            <li><span className="icon">🎛️</span>Customize ChatGPT</li>
            <li><span className="icon">⚙️</span>Settings</li>
          </ul>
          <ul>
            <li><span className="icon">❓</span>Help<span className="arrow">›</span></li>
            <li><span className="icon">↩️</span>Log out</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserMenu
