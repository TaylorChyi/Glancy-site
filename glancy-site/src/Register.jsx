import { useState } from 'react'
import CodeButton from './components/CodeButton.jsx'
import PhoneInput from './components/PhoneInput.jsx'
import { useNavigate, Link } from 'react-router-dom'
import styles from './AuthPage.module.css'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { useApi } from './hooks/useApi.js'
import { useUser } from './context/AppContext.jsx'
import { Button } from './components/index.js'
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
  const [showNotice, setShowNotice] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('')
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
    setNoticeMsg('')
    if (!validateAccount()) {
      setNoticeMsg('Invalid account')
      setShowNotice(true)
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
      setNoticeMsg(err.message)
      setShowNotice(true)
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
        <Button type="submit" className={styles['auth-primary-btn']}>Continue</Button>
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
              {(() => {
                const Icon = icons[m]
                return <Icon alt={m} />
              })()}
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

export default Register
