import { useState } from 'react'
import { Link } from 'react-router-dom'
import CodeButton from './CodeButton.jsx'
import PhoneInput from './PhoneInput.jsx'
import Button from '../ui/Button/Button.jsx'
import styles from '../../pages/auth/AuthPage.module.css'
import MessagePopup from '../ui/MessagePopup.jsx'
import {
  GoogleIcon,
  AppleIcon,
  PhoneIcon,
  WechatIcon,
  UserIcon,
  EmailIcon,
  GlancyWebLightIcon,
  GlancyWebDarkIcon
} from '../ui/Icon'
import { useTheme } from '../../context/ThemeContext.jsx'

const defaultIcons = {
  username: UserIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  wechat: WechatIcon,
  apple: AppleIcon,
  google: GoogleIcon
}

function AuthForm({
  title,
  switchText,
  switchLink,
  onSubmit,
  placeholders = {},
  formMethods = [],
  methodOrder = [],
  validateAccount = () => true,
  passwordPlaceholder = 'Password',
  showCodeButton = () => false,
  icons = defaultIcons
}) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [method, setMethod] = useState(formMethods[0])
  const [showNotice, setShowNotice] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('')
  const { resolvedTheme } = useTheme()
  const BrandIcon =
    resolvedTheme === 'dark' ? GlancyWebDarkIcon : GlancyWebLightIcon

  const handleSendCode = () => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNoticeMsg('')
    if (!validateAccount(account, method)) {
      setNoticeMsg('Invalid account')
      setShowNotice(true)
      return
    }
    try {
      await onSubmit({ account, password, method })
    } catch (err) {
      setNoticeMsg(err.message)
      setShowNotice(true)
    }
  }

  const renderForm = () => {
    if (!formMethods.includes(method)) return null
    const passHolder =
      typeof passwordPlaceholder === 'function'
        ? passwordPlaceholder(method)
        : passwordPlaceholder
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
            type={showCodeButton(method) ? 'text' : 'password'}
            placeholder={passHolder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showCodeButton(method) && <CodeButton onClick={handleSendCode} />}
        </div>
        <Button type="submit" className={styles['auth-primary-btn']}>
          Continue
        </Button>
      </form>
    )
  }

  return (
    <div className={styles['auth-page']}>
      <Link to="/" className={styles['auth-close']}>
        ×
      </Link>
      <BrandIcon className={styles['auth-logo']} />
      <div className={styles['auth-brand']}>Glancy</div>
      <h1 className={styles['auth-title']}>{title}</h1>
      {renderForm()}
      <div className={styles['auth-switch']}>
        {switchText} <Link to={switchLink}>{switchLink.includes('login') ? 'Log in' : 'Sign up'}</Link>
      </div>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      <div className={styles['login-options']}>
        {methodOrder
          .filter((m) => m !== method)
          .map((m) => {
            const Icon = icons[m]
            return (
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
                <Icon alt={m} />
              </Button>
            )
          })}
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

export default AuthForm
