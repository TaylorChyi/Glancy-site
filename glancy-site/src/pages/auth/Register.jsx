import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../../components/index.js'
import { API_PATHS } from '../../config/api.js'
import { useApi } from '../../hooks/useApi.js'
import { useUser } from '../../context/AppContext.jsx'

function Register() {
  const api = useApi()
  const { setUser } = useUser()
  const navigate = useNavigate()

  const validateAccount = (account, method) => {
    if (method === 'email') {
      return /.+@.+\..+/.test(account)
    }
    if (method === 'phone') {
      return /^\+?\d{6,15}$/.test(account)
    }
    return true
  }

  const handleRegister = async ({ account, password, method }) => {
    await api.request(API_PATHS.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        [method]: account,
        code: password
      })
    })
    const loginData = await api.request(API_PATHS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, method, password })
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

  return (
    <AuthForm
      title="Create an account"
      switchText="Already have an account?"
      switchLink="/login"
      onSubmit={handleRegister}
      placeholders={placeholders}
      formMethods={formMethods}
      methodOrder={methodOrder}
      passwordPlaceholder={() => 'Code'}
      showCodeButton={() => true}
      validateAccount={validateAccount}
    />
  )
}

export default Register
