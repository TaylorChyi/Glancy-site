import { useState } from 'react'
import { AuthForm, Button } from './components/index.js'
import { useNavigate, Link } from 'react-router-dom'
import styles from './AuthPage.module.css'
import { API_PATHS } from './config/api.js'
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
  const [method, setMethod] = useState('phone')
  const navigate = useNavigate()
  const { setUser } = useUser()
  const { resolvedTheme } = useTheme()
  const BrandIcon = resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon
  const api = useApi()

  const validateAccount = (value) => {
    if (method === 'email') {
      return /.+@.+\..+/.test(value)
    }
    if (method === 'phone') {
      return /^\+?\d{6,15}$/.test(value)
    }
    return true
  }

  const handleSendCode = () => {
    // do nothing for now
  }

  const handleRegister = async ({ account, secret }) => {
    await api(API_PATHS.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        [method]: account,
        code: secret
      })
    })
    const loginData = await api(API_PATHS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, method, password: secret })
    })
    setUser(loginData)
    navigate('/')
  }

  const placeholders = {
    phone: 'Phone number',
    email: 'Email address'
  }

  const formMethods = ['phone', 'email']

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
      {formMethods.includes(method) && (
        <AuthForm
          method={method}
          placeholders={placeholders}
          secretType="text"
          secretPlaceholder="Code"
          showCodeButton={() => true}
          onSendCode={handleSendCode}
          onSubmit={handleRegister}
          validateAccount={validateAccount}
        />
      )}
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
              onClick={() =>
                formMethods.includes(m) ? setMethod(m) : alert('Not implemented')
              }
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
    </div>
  )
}

export default Register
