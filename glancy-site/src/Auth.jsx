import { useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import { useUserStore } from './store/userStore.js'
import './components/AuthModal.css'

function Auth() {
  const { t } = useLanguage()
  const currentUser = useUserStore((s) => s.user)
  const [tab, setTab] = useState(currentUser ? 'login' : 'register')
  return (
    <div className="auth-modal" style={{ margin: '40px auto' }}>
      <div className="auth-tabs">
        <button
          type="button"
          onClick={() => setTab('register')}
          className={tab === 'register' ? 'active' : ''}
        >
          {t.navRegister}
        </button>
        <button
          type="button"
          onClick={() => setTab('login')}
          className={tab === 'login' ? 'active' : ''}
        >
          {t.navLogin}
        </button>
      </div>
      {tab === 'register' ? <Register /> : <Login />}
    </div>
  )
}

export default Auth
