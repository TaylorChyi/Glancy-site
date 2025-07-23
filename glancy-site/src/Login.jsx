import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPage.css'
import { API_PATHS } from './config/api.js'
import { useUserStore } from './store/userStore.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'
import googleIcon from './assets/google.svg'
import appleIcon from './assets/apple.svg'
import phoneIcon from './assets/phone.svg'
import wechatIcon from './assets/wechat.svg'
import userIcon from './assets/user.svg'
import emailIcon from './assets/email.svg'
import lightIcon from './assets/glancy-light.svg'
import darkIcon from './assets/glancy-dark.svg'
import { useTheme } from './ThemeContext.jsx'

function Login() {
  const setUser = useUserStore((s) => s.setUser)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [method, setMethod] = useState('phone')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      const data = await apiRequest(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password, method })
      })
      setUser(data)
      navigate(0)
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  const placeholders = {
    phone: 'Phone number',
    email: 'Email address',
    username: 'Username'
  }

  const formMethods = ['phone', 'email', 'username']

  const renderForm = () => {
    if (!formMethods.includes(method)) return null
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder={placeholders[method]}
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder={method === 'username' ? 'Password' : 'Password / code'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-primary-btn">Continue</button>
      </form>
    )
  }

  const methodOrder = ['username', 'email', 'phone', 'wechat', 'apple', 'google']
  const icons = {
    username: userIcon,
    email: emailIcon,
    phone: phoneIcon,
    wechat: wechatIcon,
    apple: appleIcon,
    google: googleIcon
  }

  return (
    <div className="auth-page">
      <img className="auth-logo" src={icon} alt="Glancy" />
      <div className="auth-brand">Glancy</div>
      <h1 className="auth-title">Welcome back</h1>
      {renderForm()}
      <div className="auth-switch">
        Don’t have an account? <Link to="/register">Sign up</Link>
      </div>
      <div className="divider">
        <span>OR</span>
      </div>
      <div className="login-options">
        {methodOrder
          .filter((m) => m !== method)
          .map((m) => (
            <button
              key={m}
              type="button"
              onClick={() =>
                formMethods.includes(m) ? setMethod(m) : alert('Not implemented')
              }
            >
              <img src={icons[m]} alt={m} />
            </button>
          ))}
      </div>
      <div className="footer-links">
        <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
      </div>
      <div className="icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
          京ICP备2025135702号-1
        </a>
      </div>
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Login
