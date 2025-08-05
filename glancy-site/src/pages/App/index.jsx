import { useState, useEffect, useRef } from 'react'
import MessagePopup from '@/components/ui/MessagePopup.jsx'
import { useHistory, useUser, useFavorites } from '@/context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext.jsx'
import translations from '@/i18n/index.js'
import DictionaryEntry from '@/components/ui/DictionaryEntry.jsx'
import ThemeIcon from '@/components/ui/Icon'
import { useLanguage } from '@/context/LanguageContext.jsx'
import { useFetchWord } from '@/hooks/useFetchWord.js'
import './App.css'
import styles from './App.module.css'
import Layout from '@/components/Layout'
import HistoryDisplay from '@/components/ui/HistoryDisplay.jsx'
import ListItem from '@/components/ui/ListItem/ListItem.jsx'
import { useModelStore } from '@/store/modelStore.ts'
import ICP from '@/components/ui/ICP.jsx'

function App() {
  const [text, setText] = useState('')
  const [entry, setEntry] = useState(null)
  const { t, lang, setLang } = useLanguage()
  const placeholder = t.searchPlaceholder
  const [loading, setLoading] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const { user } = useUser()
  const { loadHistory, addHistory, unfavoriteHistory } = useHistory()
  const { theme, setTheme } = useTheme()
  const inputRef = useRef(null)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [fromFavorites, setFromFavorites] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const { fetchWordWithHandling } = useFetchWord()
  const { model } = useModelStore()

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
      navigate('/login')
      return
    }
    if (!text.trim()) return
    // ensure result view is shown when searching from favorites or history
    setShowFavorites(false)
    setShowHistory(false)
    const input = text.trim()
    setText('')
    setLoading(true)
    const { data, error, language } = await fetchWordWithHandling({
      user,
      term: input,
      model
    })
    if (error) {
      setPopupMsg(error.message)
      setPopupOpen(true)
    } else {
      setEntry(data)
      addHistory(input, user, language)
    }
    setLoading(false)
  }

  const handleSelectHistory = async (term) => {
    if (!user) {
      navigate('/login')
      return
    }
    // hide favorites or history display when showing a selected entry
    setShowFavorites(false)
    setShowHistory(false)
    setLoading(true)
    const { data, error } = await fetchWordWithHandling({
      user,
      term,
      model
    })
    if (error) {
      setPopupMsg(error.message)
      setPopupOpen(true)
    } else {
      setEntry(data)
      // selecting from history should not reorder records
    }
    setLoading(false)
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
    <>
      <Layout
        sidebarProps={{
          onToggleFavorites: handleToggleFavorites,
          onSelectHistory: handleSelectHistory
        }}
        topBarProps={{
          term: entry?.term || '',
          showBack: !showFavorites && fromFavorites,
          onBack: handleBackFromFavorite,
          favorited: favorites.includes(entry?.term),
          onToggleFavorite: () => entry && toggleFavorite(entry.term),
          canFavorite: !!entry && !showFavorites && !showHistory
        }}
        bottomContent={(
          <form className="chatbox" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              placeholder={t.inputPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles['rounded-input']}
            />
            <button type="submit">
              {text.trim() === '' ? (
                <ThemeIcon name="voice-button" alt="voice" />
              ) : (
                <ThemeIcon name="send-button" alt="send" />
              )}
            </button>
          </form>
        )}
      >
        <div className="display">
          {showFavorites ? (
            favorites.length ? (
              <ul className="favorites-grid-display">
                {favorites.map((w, i) => (
                  <ListItem
                    key={i}
                    className="favorite-item"
                    text={w}
                    textClassName="favorite-term"
                    onClick={() => handleSelectFavorite(w)}
                    actions={(
                      <button
                        type="button"
                        className="unfavorite-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUnfavorite(w)
                        }}
                      >
                        ○
                      </button>
                    )}
                  />
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
        </div>
      </Layout>
      <ICP />
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}

export default App
