import { createPortal } from 'react-dom'
import './LogoutConfirmModal.css'
import { useLanguage } from '../LanguageContext.jsx'

function LogoutConfirmModal({ open, onConfirm, onCancel, email }) {
  const { t } = useLanguage()
  if (!open) return null
  const message = t.logoutConfirmMessage.replace('{email}', email)
  return createPortal(
    <div className="logout-overlay" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{t.logoutConfirmTitle}</h3>
        <p className="message">{message}</p>
        <div className="actions">
          <button type="button" className="logout-btn" onClick={onConfirm}>
            {t.logout}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            {t.cancelButton}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LogoutConfirmModal
