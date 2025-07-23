import { useState, useEffect, useRef } from 'react'
import { useHistoryStore } from './store/historyStore.js'
import AuthModal from './components/AuthModal.jsx'
import MessagePopup from './components/MessagePopup.jsx'
import { useUserStore } from './store/userStore.js'
import { useTheme } from './ThemeContext.jsx'
import { translations } from './translations.js'
import DictionaryEntry from './components/DictionaryEntry.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'
import { fetchWord } from './api/words.js'
import { useLanguage } from './LanguageContext.jsx'
import './App.css'
import { useIsMobile } from './utils.js'
import Brand from './components/Brand.jsx'
import SidebarFunctions from './components/Sidebar/SidebarFunctions.jsx'
import SidebarUser from './components/Sidebar/SidebarUser.jsx'
import MobileTopBar from './components/MobileTopBar.jsx'
import DesktopTopBar from './components/DesktopTopBar.jsx'
import HistoryDisplay from './components/HistoryDisplay.jsx'
import { useFavoritesStore } from './store/favoritesStore.js'

function App() {
  const [text, setText] = useState('')
  const [entry, setEntry] = useState(null)
  const { t, lang, setLang } = useLanguage()
  const placeholder = t.searchPlaceholder
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const user = useUserStore((s) => s.user)
  const loadHistory = useHistoryStore((s) => s.loadHistory)
  const addHistory = useHistoryStore((s) => s.addHistory)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const inputRef = useRef(null)
  const sendIcon = resolvedTheme === 'dark' ? sendDark : sendLight
  const voiceIcon = resolvedTheme === 'dark' ? voiceDark : voiceLight
  const [showFavorites, setShowFavorites] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [fromFavorites, setFromFavorites] = useState(false)
  const favorites = useFavoritesStore((s) => s.favorites)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const unfavoriteHistory = useHistoryStore((s) => s.unfavoriteHistory)
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleFavorites = () => {
    // always show favorites when invoked
    setShowFavorites(true)
    setShowHistory(false)
    setFromFavorites(false)
  }


  const handleUnfavorite = (term) => {
    unfavoriteHistory(term, user)
    toggleFavorite(term)
  }

  const handleSelectFavorite = async (term) => {
    await handleSelectHistory(term)
    setShowFavorites(false)
    setFromFavorites(true)
  }

  const handleBackFromFavorite = () => {
    setShowFavorites(true)
    setFromFavorites(false)
    setEntry(null)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!user) {
      setModalOpen(true)
      return
    }
    if (!text.trim()) return
    // ensure result view is shown when searching from favorites or history
    setShowFavorites(false)
    setShowHistory(false)
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
      setEntry(data)
      addHistory(input, user, lang === 'zh' ? 'CHINESE' : 'ENGLISH')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectHistory = async (term) => {
    if (!user) {
      setModalOpen(true)
      return
    }
    // hide favorites or history display when showing a selected entry
    setShowFavorites(false)
    setShowHistory(false)
    setLoading(true)
    try {
      const data = await fetchWord({
        userId: user.id,
        term,
        language: lang === 'zh' ? 'CHINESE' : 'ENGLISH',
        token: user.token
      })
      setEntry(data)
      // selecting from history should not reorder records
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
        case 'b':
          e.preventDefault()
          if (entry && !showFavorites && !showHistory) {
            toggleFavorite(entry.term)
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
  }, [lang, setLang, theme, setTheme, entry, showFavorites, showHistory, toggleFavorite])

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  useEffect(() => {
    if (!user) {
      setEntry(null)
      setText('')
      setShowFavorites(false)
      setShowHistory(false)
      setFromFavorites(false)
    }
  }, [user])

  return (
    <div className="container">
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`sidebar${isMobile ? (sidebarOpen ? ' mobile-open' : '') : ''}`}
      >
        <Brand />
        <SidebarFunctions
          onToggleFavorites={handleToggleFavorites}
          onSelectHistory={handleSelectHistory}
        />
        <SidebarUser />
      </aside>
      <div className="right">
        {isMobile ? (
          <header className="topbar">
            <MobileTopBar
              term={entry?.term || ''}
              showBack={!showFavorites && fromFavorites}
              onBack={handleBackFromFavorite}
              favorited={favorites.includes(entry?.term)}
              onToggleFavorite={() => entry && toggleFavorite(entry.term)}
              canFavorite={!!entry && !showFavorites && !showHistory}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          </header>
        ) : (
          <DesktopTopBar
            term={entry?.term || ''}
            showBack={!showFavorites && fromFavorites}
            onBack={handleBackFromFavorite}
            favorited={favorites.includes(entry?.term)}
            onToggleFavorite={() => entry && toggleFavorite(entry.term)}
            canFavorite={!!entry && !showFavorites && !showHistory}
          />
        )}
        <main className="display">
          {showFavorites ? (
            favorites.length ? (
              <ul className="favorites-grid-display">
                {favorites.map((w, i) => (
                  <li key={i} className="favorite-item">
                    <span
                      className="favorite-term"
                      onClick={() => handleSelectFavorite(w)}
                    >
                      {w}
                    </span>
                    <button
                      type="button"
                      className="unfavorite-btn"
                      onClick={() => handleUnfavorite(w)}
                    >
                      ○
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="display-content">
                <div className="display-term">{t.noFavorites || 'No favorites'}</div>
              </div>
            )
          ) : showHistory ? (
            <HistoryDisplay />
          ) : loading ? (
            '...'
          ) : entry ? (
            <DictionaryEntry entry={entry} />
          ) : (
            <div className="display-content">
              <div className="display-term">{placeholder}</div>
            </div>
          )}
        </main>
        <form className="chatbox" onSubmit={handleSend}>
          <input
            ref={inputRef}
            type="text"
            placeholder={t.inputPlaceholder}
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
        <div className="icp">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
            京ICP备2025135702号-1
          </a>
        </div>
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
