import { useState, useRef, useEffect } from 'react'
import './App.css'
import { sendChatMessage } from './api/chat.js'
import { useTheme } from './ThemeContext.jsx'
import sendLight from './assets/send-button-light.svg'
import sendDark from './assets/send-button-dark.svg'
import voiceLight from './assets/voice-button-light.svg'
import voiceDark from './assets/voice-button-dark.svg'

function Chat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const { resolvedTheme } = useTheme()
  const sendIcon = resolvedTheme === 'dark' ? sendDark : sendLight
  const voiceIcon = resolvedTheme === 'dark' ? voiceDark : voiceLight
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
      <form className="chat-input" onSubmit={sendMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">
          <img
            src={text.trim() === '' ? voiceIcon : sendIcon}
            alt={text.trim() === '' ? 'voice' : 'send'}
          />
        </button>
      </form>
    </div>
  )
}

export default Chat
