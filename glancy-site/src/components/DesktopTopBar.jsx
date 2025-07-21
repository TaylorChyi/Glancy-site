import { useState, useRef, useEffect } from 'react'
import ModelSelector from './Toolbar/ModelSelector.jsx'
import './DesktopTopBar.css'

function DesktopTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite
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
        <button
          type="button"
          className="favorite-toggle"
          onClick={onToggleFavorite}
        >
          {favorited ? '★' : '☆'}
        </button>
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
              <button type="button">Share</button>
              <button type="button">Report</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DesktopTopBar
