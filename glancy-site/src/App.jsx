import { useState } from 'react'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'
import './App.css'
import Brand from './components/Brand.jsx'
import SidebarFunctions from './components/Sidebar/SidebarFunctions.jsx'
import SidebarUser from './components/Sidebar/SidebarUser.jsx'

function App() {
  const [text, setText] = useState('')
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
        <main className="display">What are we querying next?</main>
        <div className="chatbox">
          <input
            type="text"
            placeholder="Word, Phrase or Sentence"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
          <button>
            <img
              src={text.trim() === '' ? voiceIcon : sendIcon}
              alt={text.trim() === '' ? 'voice' : 'send'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
