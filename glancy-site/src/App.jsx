import { useState } from 'react'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'
import './App.css'
import Brand from './components/Brand.jsx'
import Avatar from './components/Avatar.jsx'

function App() {
  const [text, setText] = useState('')
  const { theme } = useTheme()
  const current =
    theme === 'system' ? document.documentElement.dataset.theme : theme
  const sendIcon = current === 'dark' ? sendDark : sendLight
  const voiceIcon = current === 'dark' ? voiceDark : voiceLight

  return (
    <div className="container">
      <aside className="sidebar">
        <Brand />
      </aside>
      <div className="right">
        <header className="topbar">
          <div className="avatar">
            <Avatar width={32} height={32} />
          </div>
        </header>
        <main className="display">Display Area</main>
        <div className="chatbox">
          <input
            type="text"
            placeholder="Word, Phrase or Sentence"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
