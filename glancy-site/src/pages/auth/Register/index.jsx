import { useNavigate } from 'react-router-dom'
import { AuthForm } from '@/components'
import { API_PATHS } from '@/config/api.js'
import { useApi } from '@/hooks/useApi.js'
import { useUser } from '@/context/AppContext.jsx'

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
    await api.jsonRequest(API_PATHS.register, {
      method: 'POST',
      body: {
        [method]: account,
        code: password
      }
    })
    const loginData = await api.jsonRequest(API_PATHS.login, {
      method: 'POST',
      body: { account, method, password }
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
