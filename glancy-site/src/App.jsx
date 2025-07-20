import { useState } from 'react'
import AuthModal from './components/AuthModal.jsx'
import MessagePopup from './components/MessagePopup.jsx'
import { useUserStore } from './store/userStore.js'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'
import { fetchWord } from './api/words.js'
import { useLanguage } from './LanguageContext.jsx'
import './App.css'
import Brand from './components/Brand.jsx'
import SidebarFunctions from './components/Sidebar/SidebarFunctions.jsx'
import SidebarUser from './components/Sidebar/SidebarUser.jsx'

function App() {
  const [text, setText] = useState('')
  const [display, setDisplay] = useState('What are we querying next?')
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const user = useUserStore((s) => s.user)
  const { resolvedTheme } = useTheme()
  const { lang } = useLanguage()
  const sendIcon = resolvedTheme === 'dark' ? sendDark : sendLight
  const voiceIcon = resolvedTheme === 'dark' ? voiceDark : voiceLight

  const handleSend = async (e) => {
    e.preventDefault()
    if (!user) {
      setModalOpen(true)
      return
    }
    if (!text.trim()) return
    const input = text.trim()
    setText('')
    setLoading(true)
    try {
      const data = await fetchWord({
        userId: user.id,
        term: input,
        language: lang === 'zh' ? 'CHINESE' : 'ENGLISH',
        token: user.token
      })
      setDisplay(data.definition)
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
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
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default App
