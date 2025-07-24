import { useState } from 'react'
import CodeButton from './components/CodeButton.jsx'
import PhoneInput from './components/PhoneInput.jsx'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPage.css'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'
import { useUserStore } from './store/userStore.js'
import googleIcon from './assets/google.svg'
import appleIcon from './assets/apple.svg'
import phoneIcon from './assets/phone.svg'
import wechatIcon from './assets/wechat.svg'
import emailIcon from './assets/email.svg'
import lightIcon from './assets/glancy-web-light.svg'
import darkIcon from './assets/glancy-web-dark.svg'
import { useTheme } from './ThemeContext.jsx'

function Register() {
  const [account, setAccount] = useState('')
  const [code, setCode] = useState('')
  const [method, setMethod] = useState('phone')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const setUser = useUserStore((s) => s.setUser)
  const { resolvedTheme } = useTheme()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon

  const validateAccount = () => {
    if (method === 'email') {
      return /.+@.+\..+/.test(account)
    }
    if (method === 'phone') {
      return /^\+?\d{6,15}$/.test(account)
    }
    return true
  }

  const handleSendCode = () => {
    // do nothing for now
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    if (!validateAccount()) {
      setPopupMsg('Invalid account')
      setPopupOpen(true)
      return
    }
    try {
      await apiRequest(API_PATHS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [method]: account,
          code
        })
      })
      const loginData = await apiRequest(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, method, password: code })
      })
      setUser(loginData)
      navigate('/')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  const placeholders = {
    phone: 'Phone number',
    email: 'Email address'
  }

  const formMethods = ['phone', 'email']

  const renderForm = () => {
    if (!formMethods.includes(method)) return null
    return (
      <form onSubmit={handleSubmit} className="auth-form">
        {method === 'phone' ? (
          <PhoneInput value={account} onChange={setAccount} />
        ) : (
          <input
            className="auth-input"
            placeholder={placeholders[method]}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        )}
        <div className="password-row">
          <input
            className="auth-input"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <CodeButton onClick={handleSendCode} />
        </div>
        <button type="submit" className="auth-primary-btn">Continue</button>
      </form>
    )
  }

  const methodOrder = ['phone', 'email', 'wechat', 'apple', 'google']
  const icons = {
    email: emailIcon,
    phone: phoneIcon,
    wechat: wechatIcon,
    apple: appleIcon,
    google: googleIcon
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-close">×</Link>
      <img className="auth-logo" src={icon} alt="Glancy" />
      <div className="auth-brand">Glancy</div>
      <h1 className="auth-title">Create an account</h1>
      {renderForm()}
      <div className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
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
      <div className="auth-footer">
        <div className="footer-links">
          <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
        </div>
        <div className="icp">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
            京ICP备2025135702号-1
          </a>
        </div>
      </div>
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Register
