import { useState } from 'react'
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
import lightIcon from './assets/glancy-light.svg'
import darkIcon from './assets/glancy-dark.svg'
import { useTheme } from './ThemeContext.jsx'

function Register() {
  const [email, setEmail] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const setUser = useUserStore((s) => s.setUser)
  const { resolvedTheme } = useTheme()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      await apiRequest(API_PATHS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const loginData = await apiRequest(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: email })
      })
      setUser(loginData)
      setPopupMsg('Welcome ' + email)
      setPopupOpen(true)
      navigate('/')
    } catch (err) {
      setPopupMsg(err.message)
      setPopupOpen(true)
    }
  }

  return (
    <div className="auth-page">
      <img className="auth-logo" src={icon} alt="Glancy" />
      <div className="auth-brand">Glancy</div>
      <h1 className="auth-title">Create an account</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="auth-primary-btn">
          Continue
        </button>
      </form>
      <div className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      <div className="divider">
        <span>OR</span>
      </div>
      <div className="oauth-buttons">
        <button type="button">
          <img src={googleIcon} alt="Google" />
          Continue with Google
        </button>
        <button type="button">
          <img src={appleIcon} alt="Apple" />
          Continue with Apple
        </button>
        <button type="button">
          <img src={phoneIcon} alt="Phone" />
          Continue with phone
        </button>
        <button type="button">
          <img src={wechatIcon} alt="WeChat" />
          Continue with WeChat
        </button>
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
