import { useState, useRef, useEffect } from 'react'
import './App.css'

function Chat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!text) return
    const msg = { from: 'user', text }
    setMessages((m) => [...m, msg])
    setText('')
    setLoading(true)
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg.text })
      })
      const data = await resp.json()
      setMessages((m) => [...m, { from: 'bot', text: data.reply }])
    } catch (err) {
      setMessages((m) => [...m, { from: 'bot', text: err.message }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight)
  }, [messages, loading])

  return (
    <div className="App">
      <div
        ref={listRef}
        style={{ maxHeight: '60vh', overflowY: 'auto', textAlign: 'left' }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.from === 'user' ? 'You:' : 'Bot:'}</strong> {m.text}
          </p>
        ))}
        {loading && <p>...</p>}
      </div>
      <form
        onSubmit={sendMessage}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '80%' }}
        />
        <button type="submit" style={{ width: '20%' }}>
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
