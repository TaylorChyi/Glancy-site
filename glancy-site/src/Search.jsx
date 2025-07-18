import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { fetchWord, fetchWordAudio } from './api/words.js'
import { useUserStore } from './store/userStore.js'
import MessagePopup from './components/MessagePopup.jsx'

function Search() {
  const { t } = useLanguage()
  const user = useUserStore((s) => s.user)
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history))
  }, [history])

  const handleSearch = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      const data = await fetchWord(word)
      setResult(data)
      setHistory((h) => {
        const unique = Array.from(new Set([word, ...h]))
        return unique.slice(0, 20)
      })
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
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
        <div>
          <p>{result.definition}</p>
          <button onClick={playAudio}>{t.playAudio}</button>
        </div>
      )}
      {user && history.length > 0 && (
        <div>
          <h3>{t.searchHistory}</h3>
          <button onClick={() => setHistory([])}>{t.clearHistory}</button>
          <ul>
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search
