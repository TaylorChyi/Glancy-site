import { useState, useRef, useEffect } from 'react'
import Avatar from '../Avatar.jsx'
import ProTag from './ProTag.jsx'

function UserMenuButton({ size, showName, isPro, username, children }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

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

  return (
    <div className="header-section user-menu" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className={showName ? 'with-name' : ''}>
        <Avatar width={size} height={size} />
        {showName ? (
          <div className="info">
            <span className="username">{username}</span>
            {isPro && <ProTag />}
          </div>
        ) : (
          isPro && <ProTag />
        )}
      </button>
      {children({ open, setOpen })}
    </div>
  )
}

export default UserMenuButton
