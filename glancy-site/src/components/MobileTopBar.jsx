import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../ThemeContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import lightIcon from '../assets/glancy-web-light.svg'
import darkIcon from '../assets/glancy-web-dark.svg'
import ModelSelector from './Toolbar/ModelSelector.jsx'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/userStore.js'
import './MobileTopBar.css'

function MobileTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false,
  onOpenSidebar
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { resolvedTheme } = useTheme()
  const { lang, t } = useLanguage()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon
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
    <>
      <button className="topbar-btn" onClick={onOpenSidebar}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
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
      <div className="term-text">{term || (lang === 'zh' ? '格律词典' : 'Glancy')}</div>
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
        ) : null}
      </div>
    </>
  )
}

export default MobileTopBar
