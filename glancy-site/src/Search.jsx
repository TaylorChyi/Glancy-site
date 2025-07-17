import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { fetchWord, fetchWordAudio } from './api/words.js'

function Search() {
  const { t } = useLanguage()
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history))
  }, [history])

  const handleSearch = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const data = await fetchWord(word)
      setResult(data)
      setHistory((h) => [word, ...h])
    } catch (err) {
      setMessage(err.message)
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
        {message && <p>{message}</p>}
      </form>
      {result && (
        <div>
          <p>{result.definition}</p>
          <button onClick={playAudio}>{t.playAudio}</button>
        </div>
      )}
      {history.length > 0 && (
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
