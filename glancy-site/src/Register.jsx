import { useState } from 'react'
import CodeButton from './components/CodeButton.jsx'
import PhoneInput from './components/PhoneInput.jsx'
import { useNavigate, Link } from 'react-router-dom'
import styles from './AuthPage.module.css'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { useApi } from './hooks/useApi.js'
import { useUser } from './context/AppContext.jsx'
import {
  GoogleIcon,
  AppleIcon,
  PhoneIcon,
  WechatIcon,
  EmailIcon,
  GlancyWebLightIcon,
  GlancyWebDarkIcon
} from './components/Icon'
import { useTheme } from './ThemeContext.jsx'

function Register() {
  const [account, setAccount] = useState('')
  const [code, setCode] = useState('')
  const [method, setMethod] = useState('phone')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const navigate = useNavigate()
  const { setUser } = useUser()
  const { resolvedTheme } = useTheme()
  const BrandIcon = resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon
  const api = useApi()

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
      await api(API_PATHS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [method]: account,
          code
        })
      })
      const loginData = await api(API_PATHS.login, {
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
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        {method === 'phone' ? (
          <PhoneInput value={account} onChange={setAccount} />
        ) : (
          <input
            className={styles['auth-input']}
            placeholder={placeholders[method]}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        )}
        <div className={styles['password-row']}>
          <input
            className={styles['auth-input']}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <CodeButton onClick={handleSendCode} />
        </div>
        <button type="submit" className={styles['auth-primary-btn']}>Continue</button>
      </form>
    )
  }

  const methodOrder = ['phone', 'email', 'wechat', 'apple', 'google']
  const icons = {
    email: EmailIcon,
    phone: PhoneIcon,
    wechat: WechatIcon,
    apple: AppleIcon,
    google: GoogleIcon
  }

  return (
    <div className={styles['auth-page']}>
      <Link to="/" className={styles['auth-close']}>×</Link>
      <BrandIcon className={styles['auth-logo']} />
      <div className={styles['auth-brand']}>Glancy</div>
      <h1 className={styles['auth-title']}>Create an account</h1>
      {renderForm()}
      <div className={styles['auth-switch']}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      <div className={styles['login-options']}>
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
      <div className={styles['auth-footer']}>
        <div className={styles['footer-links']}>
          <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
        </div>
        <div className={styles.icp}>
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
