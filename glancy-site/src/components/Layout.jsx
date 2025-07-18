import { Outlet } from 'react-router-dom'
import './Layout.css'
import Avatar from './Avatar.jsx'

function Layout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
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
      </aside>
      <main className="main">
        <div className="avatar-wrapper">
          <div className="avatar">
            <Avatar />
          </div>
          <div className="plus-badge">PLUS</div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
