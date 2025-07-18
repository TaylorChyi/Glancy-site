import { useState } from 'react'
import './AuthModal.css'
import { useLanguage } from '../LanguageContext.jsx'
import Login from '../Login.jsx'
import Register from '../Register.jsx'

function AuthModal({ open, onClose }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState('register')
  if (!open) return null
  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
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
    </div>
  )
}

export default AuthModal
