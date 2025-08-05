import { useNavigate } from 'react-router-dom'
import { AuthForm } from '@/components'
import { API_PATHS } from '@/config/api.js'
import { useApiResource } from '@/hooks/useApiResource.js'
import { useUser } from '@/context/AppContext.jsx'
import { useLanguage } from '@/context/LanguageContext.jsx'

function Register() {
  const jsonRequest = useApiResource('jsonRequest')
  const { setUser } = useUser()
  const navigate = useNavigate()
  const { t } = useLanguage()

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
    await jsonRequest(API_PATHS.register, {
      method: 'POST',
      body: {
        [method]: account,
        code: password
      }
    })
    const loginData = await jsonRequest(API_PATHS.login, {
      method: 'POST',
      body: { account, method, password }
    })
    setUser(loginData)
    navigate('/')
  }

  const placeholders = {
    phone: t.phonePlaceholder,
    email: t.emailPlaceholder
  }

  const formMethods = ['phone', 'email']
  const methodOrder = ['phone', 'email', 'wechat', 'apple', 'google']

  return (
    <AuthForm
      title={t.registerCreate}
      switchText={t.registerSwitch}
      switchLink="/login"
      onSubmit={handleRegister}
      placeholders={placeholders}
      formMethods={formMethods}
      methodOrder={methodOrder}
      passwordPlaceholder={() => t.codePlaceholder}
      showCodeButton={() => true}
      validateAccount={validateAccount}
    />
  )
}

export default Register
