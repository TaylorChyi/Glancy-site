import { useState, useRef, useEffect } from 'react'
import ModelSelector from './Toolbar/ModelSelector.jsx'
import './DesktopTopBar.css'

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
      {showBack && (
        <button type="button" className="back-btn" onClick={onBack}>
          ←
        </button>
      )}
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
                <span className="icon">🔗</span>Share
              </button>
              <button type="button">
                <span className="icon">🚩</span>Report
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DesktopTopBar
