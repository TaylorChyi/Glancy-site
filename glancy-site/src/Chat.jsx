import { useState, useRef, useEffect } from 'react'
import './App.css'
import { sendChatMessage } from './api/chat.js'

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
      const data = await sendChatMessage(msg.text)
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
    <div className="chat-window">
      <div className="chat-messages" ref={listRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.from === 'user' ? 'user' : ''}`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="chat-bubble">...</div>}
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
