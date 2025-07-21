import { useState, useEffect, useRef } from 'react'
import AuthModal from './components/AuthModal.jsx'
import MessagePopup from './components/MessagePopup.jsx'
import { useUserStore } from './store/userStore.js'
import { useTheme } from './ThemeContext.jsx'
import { translations } from './translations.js'
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
  const [display, setDisplay] = useState(['What are we querying next?'])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const user = useUserStore((s) => s.user)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { lang, t, setLang } = useLanguage()
  const inputRef = useRef(null)
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
      const defs =
        data.definition ||
        (data.definitions && data.definitions.length > 0
          ? data.definitions.join('; ')
          : '')
      const lines = [data.term]
      if (data.phonetic) lines.push(`(${data.phonetic})`)
      if (defs) lines.push(defs)
      else lines.push(t.noDefinition)
      if (data.example) lines.push(`"${data.example}"`)
      setDisplay(lines)
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    function handleShortcut(e) {
      const platform =
        navigator.userAgentData?.platform || navigator.platform || ''
      const mod = /Mac|iPhone|iPod|iPad/i.test(platform) ? e.metaKey : e.ctrlKey
      if (!mod || !e.shiftKey) return
      switch (e.key.toLowerCase()) {
        case 'f':
          e.preventDefault()
          inputRef.current?.focus()
          break
        case 'l':
          e.preventDefault()
          {
            const langs = Object.keys(translations)
            const next = langs[(langs.indexOf(lang) + 1) % langs.length]
            setLang(next)
          }
          break
        case 'm':
          e.preventDefault()
          {
            const seq = { dark: 'light', light: 'system', system: 'dark' }
            setTheme(seq[theme] || 'light')
          }
          break
        case 'k':
          e.preventDefault()
          document.dispatchEvent(new Event('open-shortcuts'))
          break
        default:
          break
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [lang, setLang, theme, setTheme])

  return (
    <div className="container">
      <aside className="sidebar">
        <Brand />
        <SidebarFunctions />
        <SidebarUser />
      </aside>
      <div className="right">
        <header className="topbar"></header>
        <main className="display">
          {loading ? (
            '...'
          ) : (
            <div className="display-content">
              {display.map((line, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? 'display-term' : undefined}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </main>
        <form className="chatbox" onSubmit={handleSend}>
          <input
            ref={inputRef}
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
