import './components/Layout.css'
import Brand from './components/Brand.jsx'
import SidebarFunctions from './components/Sidebar/SidebarFunctions.jsx'
import SidebarUser from './components/Sidebar/SidebarUser.jsx'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'

function Home() {
  const { resolvedTheme } = useTheme()
  const sendIcon = resolvedTheme === 'dark' ? sendDark : sendLight
  const voiceIcon = resolvedTheme === 'dark' ? voiceDark : voiceLight

  return (
    <div className="container">
      <aside className="sidebar">
        <Brand />
        <SidebarFunctions />
        <SidebarUser />
      </aside>
      <div className="right">
        <header className="topbar"></header>
        <main className="display" style={{ flexDirection: 'column' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Where should we begin?
          </h1>
          <form className="input-box">
            <input type="text" placeholder="Ask anything" />
            <button type="button" className="icon-btn">
              <img src={voiceIcon} alt="voice" />
            </button>
            <button type="submit" className="icon-btn">
              <img src={sendIcon} alt="send" />
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Home
