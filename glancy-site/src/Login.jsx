import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import { useUserStore } from './store/userStore.js'
import MessagePopup from './components/MessagePopup.jsx'
import { extractMessage } from './utils.js'

function Login() {
  const { t } = useLanguage()
  const setUser = useUserStore((s) => s.setUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      const resp = await fetch(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(extractMessage(text) || t.loginButton + '失败')
      }
      const data = await resp.json()
      setUser(data)
      setPopupMsg(`${t.loginButton} ${data.username}`)
      setPopupOpen(true)
      if (data.username === 'admin') {
        navigate('/portal')
      } else {
        navigate('/')
      }
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">{t.account}</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t.password}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{t.loginButton}</button>
        <MessagePopup
          open={popupOpen}
          message={popupMsg}
          onClose={() => setPopupOpen(false)}
        />
      </form>
    </div>
  )
}

export default Login
