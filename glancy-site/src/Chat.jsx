import { useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Chat() {
  const { t } = useLanguage()
  const [msg, setMsg] = useState('')
  const [history, setHistory] = useState([])

  const send = (e) => {
    e.preventDefault()
    if (!msg) return
    setHistory((h) => [...h, msg])
    setMsg('')
  }

  return (
    <div className="App">
      <h2>{t.navChat}</h2>
      <ul>
        {history.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <form onSubmit={send}>
        <input
          placeholder={t.chatPlaceholder}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">{t.sendButton}</button>
      </form>
    </div>
  )
}

export default Chat
