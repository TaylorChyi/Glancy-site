import { useState, useRef, useEffect } from 'react'
import Avatar from '../Avatar.jsx'
import ProTag from './ProTag.jsx'
import styles from './Header.module.css'

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
    <div className={`${styles.headerSection} ${styles.userMenu}`} ref={menuRef}>
      <button onClick={() => setOpen(!open)} className={showName ? styles.withName : ''}>
        <Avatar width={size} height={size} />
        {showName ? (
          <div className={styles.info}>
            <span className={styles.username}>{username}</span>
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
