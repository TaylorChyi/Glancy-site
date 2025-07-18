import { useState } from 'react'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'
import { sendChatMessage } from './api/chat.js'
import './App.css'
import Brand from './components/Brand.jsx'
import SidebarFunctions from './components/Sidebar/SidebarFunctions.jsx'
import SidebarUser from './components/Sidebar/SidebarUser.jsx'

function App() {
  const [text, setText] = useState('')
  const [display, setDisplay] = useState('What are we querying next?')
  const [loading, setLoading] = useState(false)
  const { resolvedTheme } = useTheme()
  const sendIcon = resolvedTheme === 'dark' ? sendDark : sendLight
  const voiceIcon = resolvedTheme === 'dark' ? voiceDark : voiceLight

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const input = text
    setText('')
    setLoading(true)
    try {
      const data = await sendChatMessage(input)
      setDisplay(data.reply)
    } catch (err) {
      setDisplay(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <Brand />
        <SidebarFunctions />
        <SidebarUser />
      </aside>
      <div className="right">
        <header className="topbar"></header>
        <main className="display">{loading ? '...' : display}</main>
        <form className="chatbox" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Word, Phrase or Sentence"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
          <button type="submit">
            <img
              src={text.trim() === '' ? voiceIcon : sendIcon}
              alt={text.trim() === '' ? 'voice' : 'send'}
            />
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
