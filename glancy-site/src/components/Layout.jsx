import { useState, useRef } from 'react'
import { useLanguage } from '../LanguageContext.jsx'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import Avatar from './Avatar.jsx'
import UserInfoCard from './UserInfoCard.jsx'

function Layout() {
  const [hover, setHover] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(260)
  const fileRef = useRef(null)
  const { t } = useLanguage()

  const handleMouseDown = (e) => {
    if (window.innerWidth <= 600) return
    const startX = e.clientX
    const startWidth = sidebarWidth
    const onMove = (ev) => {
      const dx = ev.clientX - startX
      const min = window.innerWidth * 0.15
      const max = window.innerWidth * 0.3
      let width = startWidth + dx
      if (width < min) width = min
      if (width > max) width = max
      setSidebarWidth(width)
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div className="app-container">
      <aside className="sidebar" style={{ width: sidebarWidth }}>
        <h2>ChatGPT 4o</h2>
        <button>New chat</button>
        <button>Search chats</button>
        <button>Library</button>
        <button>Codex</button>
        <button>Sora</button>
        <button>GPTs</button>
        <hr style={{ margin: '20px 0', borderColor: 'var(--border-color)' }} />
        <button>New project</button>
        <button style={{ color: 'var(--brand-color)' }}>Glancy</button>
        <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>Chats</div>
        <button>UI设计文字描述</button>
        <button>界面模块划分</button>
        <button>高级黑白配色</button>
        <button>需要帮助请告知</button>
        <button>Spring Security Lambda DSL</button>
        <button>GitHub Action 失败邮件</button>
        <button>斜视视野与成像</button>
        <div className="sidebar-resizer" onMouseDown={handleMouseDown} />
      </aside>
      <main className="main">
        <div
          className="avatar-wrapper"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="avatar">
            <Avatar />
            <div className="change-avatar" onClick={() => fileRef.current && fileRef.current.click()}>
              <span style={{ fontSize: '16px' }}>📷</span>
              <span>{t.changeAvatar}</span>
              <input
                ref={fileRef}
                type="file"
                style={{ position: 'absolute', inset: 0, opacity: 0 }}
              />
            </div>
          </div>
          <div className="plus-badge">PLUS</div>
          {hover && (
            <UserInfoCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          )}
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
