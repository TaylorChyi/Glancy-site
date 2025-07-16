import { useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Search() {
  const { t } = useLanguage()
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    const resp = await fetch(`/api/words?word=${encodeURIComponent(word)}`)
    const data = await resp.json()
    setResult(data)
    setHistory((h) => [word, ...h])
  }

  const playAudio = async () => {
    const resp = await fetch(`/api/words/audio?word=${encodeURIComponent(word)}`)
    const blob = await resp.blob()
    const url = URL.createObjectURL(blob)
    new Audio(url).play()
  }

  return (
    <div className="App">
      <h2>{t.searchTitle}</h2>
      <form onSubmit={handleSearch}>
        <input value={word} onChange={(e) => setWord(e.target.value)} />
        <button type="submit">{t.searchButton}</button>
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
