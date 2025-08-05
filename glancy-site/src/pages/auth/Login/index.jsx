import { useNavigate } from 'react-router-dom'
import { AuthForm } from '@/components'
import { API_PATHS } from '@/config/api.js'
import { useUser } from '@/context/AppContext.jsx'
import { useApi } from '@/hooks/useApi.js'
import { useLanguage } from '@/context/LanguageContext.jsx'

function Login() {
  const { setUser } = useUser()
  const api = useApi()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleLogin = async ({ account, password, method }) => {
    const data = await api.request(API_PATHS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password, method })
    })
    setUser(data)
    navigate('/')
  }

  const placeholders = {
    phone: t.phonePlaceholder,
    email: t.emailPlaceholder,
    username: t.usernamePlaceholder
  }

  const formMethods = ['phone', 'email', 'username']
  const methodOrder = ['username', 'email', 'phone', 'wechat', 'apple', 'google']

  return (
    <AuthForm
      title={t.loginWelcome}
      switchText={t.loginSwitch}
      switchLink="/register"
      onSubmit={handleLogin}
      placeholders={placeholders}
      formMethods={formMethods}
      methodOrder={methodOrder}
      passwordPlaceholder={(m) =>
        m === 'username'
          ? t.passwordPlaceholder
          : t.passwordOrCodePlaceholder
      }
      showCodeButton={(m) => m !== 'username'}
    />
  )
}

export default Login
