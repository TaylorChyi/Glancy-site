import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../../../components'
import { API_PATHS } from '../../../config/api.js'
import { useUser } from '../../../context/AppContext.jsx'
import { useApi } from '../../../hooks/useApi.js'

function Login() {
  const { setUser } = useUser()
  const api = useApi()
  const navigate = useNavigate()

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
    phone: 'Phone number',
    email: 'Email address',
    username: 'Username'
  }

  const formMethods = ['phone', 'email', 'username']
  const methodOrder = ['username', 'email', 'phone', 'wechat', 'apple', 'google']

  return (
    <AuthForm
      title="Welcome back"
      switchText="Don’t have an account?"
      switchLink="/register"
      onSubmit={handleLogin}
      placeholders={placeholders}
      formMethods={formMethods}
      methodOrder={methodOrder}
      passwordPlaceholder={(m) =>
        m === 'username' ? 'Password' : 'Password / code'
      }
      showCodeButton={(m) => m !== 'username'}
    />
  )
}

export default Login
