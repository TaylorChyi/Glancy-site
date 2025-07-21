import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'
import { useUserStore } from './store/userStore.js'

function Register() {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const setUser = useUserStore((s) => s.setUser)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    if (password !== confirmPassword) {
      setPopupMsg(t.submitFail)
      setPopupOpen(true)
      return
    }
    try {
      await apiRequest(API_PATHS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, password })
      })
      const loginData = await apiRequest(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: email, password: email })
      })
      setUser(loginData)
      setPopupMsg(t.loginButton + ' ' + email)
      setPopupOpen(true)
      navigate('/')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">{t.username}</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">{t.email}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">{t.phone}</label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div>
          <label htmlFor="confirmPassword">{t.confirmPassword}</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">{t.registerButton}</button>
        <MessagePopup
          open={popupOpen}
          message={popupMsg}
          onClose={() => setPopupOpen(false)}
        />
      </form>
    </div>
  )
}

export default Register
