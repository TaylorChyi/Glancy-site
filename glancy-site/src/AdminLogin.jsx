import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'

function AdminLogin() {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      await apiRequest(API_PATHS.adminLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      setPopupMsg(t.loginButton + '成功')
      setPopupOpen(true)
      navigate('/portal')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  return (
    <div className="App">
      <h2>{t.adminLoginTitle}</h2>
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

export default AdminLogin
