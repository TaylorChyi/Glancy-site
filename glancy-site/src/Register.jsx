import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'

function Register() {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (password !== confirmPassword) {
      setMessage(t.submitFail)
      return
    }
    try {
      const resp = await fetch(API_PATHS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, password })
      })
      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(text || t.registerButton + '失败')
      }
      await resp.json()
      setMessage(t.registerButton + '成功')
      navigate('/login')
    } catch (err) {
      setMessage(err.message)
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
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default Register
