import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Chat() {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('chatMessages')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((m) => [...m, input])
    setInput('')
  }

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem('chatMessages')
  }

  return (
    <div className="App">
      <h2>Chat</h2>
      <form onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      {messages.length > 0 && (
        <div>
          <button onClick={clearHistory}>{t.clearHistory}</button>
          <ul>
            {messages.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Chat
