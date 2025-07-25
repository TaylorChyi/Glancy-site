import { useState } from 'react'
import CodeButton from './components/CodeButton.jsx'
import PhoneInput from './components/PhoneInput.jsx'
import { useNavigate, Link } from 'react-router-dom'
import styles from './AuthPage.module.css'
import { Button } from './components/index.js'
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
  const [showNotice, setShowNotice] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('')
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()
  const BrandIcon =
    resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNoticeMsg('')
    try {
      const data = await api.request(API_PATHS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password, method })
      })
      setUser(data)
      navigate('/')
    } catch (err) {
      setNoticeMsg(err.message)
      setShowNotice(true)
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
            type="password"
            placeholder={method === 'username' ? 'Password' : 'Password / code'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {method !== 'username' && (
            <CodeButton onClick={handleSendCode} />
          )}
        </div>
        <button type="submit" className={styles['auth-primary-btn']}>Continue</button>
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
    <div className={styles['auth-page']}>
      <Link to="/" className={styles['auth-close']}>×</Link>
      <BrandIcon className={styles['auth-logo']} />
      <div className={styles['auth-brand']}>Glancy</div>
      <h1 className={styles['auth-title']}>Welcome back</h1>
      {renderForm()}
      <div className={styles['auth-switch']}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </div>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      <div className={styles['login-options']}>
        {methodOrder
          .filter((m) => m !== method)
          .map((m) => (
            <Button
              key={m}
              type="button"
              onClick={() => {
                if (formMethods.includes(m)) {
                  setMethod(m)
                } else {
                  setNoticeMsg('Not implemented yet')
                  setShowNotice(true)
                }
              }}
            >
              <img src={icons[m]} alt={m} />
            </Button>
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
        open={showNotice}
        message={noticeMsg}
        onClose={() => setShowNotice(false)}
      />
    </div>
  )
}

export default Login
