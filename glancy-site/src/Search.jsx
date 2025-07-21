import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { fetchWord, fetchWordAudio } from './api/words.js'
import { useUserStore } from './store/userStore.js'
import MessagePopup from './components/MessagePopup.jsx'
import DictionaryEntry from './components/DictionaryEntry.jsx'
import { useHistoryStore } from './store/historyStore.js'

function Search() {
  const { t, lang } = useLanguage()
  const user = useUserStore((s) => s.user)
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const history = useHistoryStore((s) => s.history)
  const addHistory = useHistoryStore((s) => s.addHistory)
  const clearHistory = useHistoryStore((s) => s.clearHistory)
  const loadHistory = useHistoryStore((s) => s.loadHistory)

  useEffect(() => {
    loadHistory(user)
  }, [user, loadHistory])

  const searchTerm = async (term) => {
    setPopupMsg('')
    try {
      const data = await fetchWord({
        userId: user?.id,
        term,
        language: lang === 'zh' ? 'CHINESE' : 'ENGLISH',
        token: user?.token
      })
      setResult(data)
      addHistory(term, user, lang === 'zh' ? 'CHINESE' : 'ENGLISH')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    searchTerm(word)
  }

  const handleHistoryClick = (term) => {
    setWord(term)
    searchTerm(term)
  }

  const playAudio = async () => {
    const blob = await fetchWordAudio(word)
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.onended = () => URL.revokeObjectURL(url)
    audio.play()
  }

  return (
    <div className="App">
      <h2>{t.searchTitle}</h2>
      <form onSubmit={handleSearch}>
        <input value={word} onChange={(e) => setWord(e.target.value)} />
        <button type="submit">{t.searchButton}</button>
        <MessagePopup
          open={popupOpen}
          message={popupMsg}
          onClose={() => setPopupOpen(false)}
        />
      </form>
      {result && (
        <div className="result">
          <DictionaryEntry entry={result} />
          <button onClick={playAudio}>{t.playAudio}</button>
        </div>
      )}
      {history.length > 0 && (
        <div>
          <button onClick={() => clearHistory(user)}>{t.clearHistory}</button>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                <button type="button" onClick={() => handleHistoryClick(h)}>
                  {h}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search
