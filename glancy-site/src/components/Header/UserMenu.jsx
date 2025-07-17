import { useState } from 'react'
import './Header.css'
import ProTag from './ProTag.jsx'
import Avatar from '../Avatar.jsx'

function UserMenu() {
  const [open, setOpen] = useState(false)
  const email = 'user@example.com'
  const isPro = true

  return (
    <div className="header-section user-menu">
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
