import { useState } from 'react'
import CodeButton from './components/CodeButton.jsx'
import PhoneInput from './components/PhoneInput.jsx'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPage.css'
import { API_PATHS } from './config/api.js'
import { useUser } from './context/AppContext.jsx'
import MessagePopup from './components/MessagePopup.jsx'
import { useApi } from './hooks/useApi.js'
import {
  GoogleIcon,
  AppleIcon,
  PhoneIcon,
  WechatIcon,
  UserIcon,
  EmailIcon,
  GlancyWebLightIcon,
  GlancyWebDarkIcon
} from './components/Icon'
import { useTheme } from './ThemeContext.jsx'

function Login() {
  const { setUser } = useUser()
  const api = useApi()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [method, setMethod] = useState('phone')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const BrandIcon =
    resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPopupMsg('')
    try {
      const data = await api(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password, method })
      })
      setUser(data)
      navigate('/')
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

  const handleSendCode = () => {
    // do nothing for now
  }

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
            type="password"
            placeholder={method === 'username' ? 'Password' : 'Password / code'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {method !== 'username' && (
            <CodeButton onClick={handleSendCode} />
          )}
        </div>
        <button type="submit" className="auth-primary-btn">Continue</button>
      </form>
    )
  }

  const methodOrder = ['username', 'email', 'phone', 'wechat', 'apple', 'google']
  const icons = {
    username: UserIcon,
    email: EmailIcon,
    phone: PhoneIcon,
    wechat: WechatIcon,
    apple: AppleIcon,
    google: GoogleIcon
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-close">×</Link>
      <BrandIcon className="auth-logo" />
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
              {(() => {
                const Icon = icons[m]
                return <Icon alt={m} />
              })()}
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

export default Login
