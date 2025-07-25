import useOutsideToggle from '../../hooks/useOutsideToggle.js'
import Avatar from '../Avatar.jsx'
import ProTag from './ProTag.jsx'

function UserMenuButton({ size, showName, isPro, username, children }) {
  const { open, setOpen, ref: menuRef } = useOutsideToggle(false)

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
