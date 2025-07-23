import { useState, useRef, useEffect } from 'react'
import ModelSelector from './Toolbar/ModelSelector.jsx'
import './DesktopTopBar.css'
import './Header/Header.css'
import { useLanguage } from '../LanguageContext.jsx'
import { useUserStore } from '../store/userStore.js'
import { Link } from 'react-router-dom'

function DesktopTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { t } = useLanguage()
  const user = useUserStore((s) => s.user)

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
    <header className="desktop-topbar">
      <button
        type="button"
        className="back-btn"
        onClick={onBack}
        style={{
          visibility: showBack ? 'visible' : 'hidden',
          pointerEvents: showBack ? 'auto' : 'none'
        }}
      >
        ←
      </button>
      <div className="term-text">{term}</div>
      <div className="topbar-right">
        {canFavorite && (
          <button
            type="button"
            className="favorite-toggle"
            onClick={onToggleFavorite}
          >
            {favorited ? '★' : '☆'}
          </button>
        )}
        {user ? (
          <>
            <ModelSelector />
            <div className="more-menu" ref={menuRef}>
              <button
                type="button"
                className="more-btn"
                onClick={() => setOpen(!open)}
              >
                ⋮
              </button>
              {open && (
                <div className="menu">
                  <button type="button">
                    <span className="icon">🔗</span>{t.share}
                  </button>
                  <button type="button">
                    <span className="icon">🚩</span>{t.report}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            {t.navRegister}/{t.navLogin}
          </Link>
        )}
      </div>
    </header>
  )
}

export default DesktopTopBar
