import { useState } from 'react'
import './App.css'
import Brand from './components/Brand.jsx'

function App() {
  const [text, setText] = useState('')

  return (
    <div className="container">
      <aside className="sidebar">
        <Brand />
      </aside>
      <div className="right">
        <header className="topbar">
          <div className="avatar">
            <img src="https://via.placeholder.com/32" alt="avatar" />
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
          <button>{text.trim() === '' ? '🎤' : '➤'}</button>
        </div>
      </div>
    </div>
  )
}

export default App
