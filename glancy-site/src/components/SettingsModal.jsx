import Preferences from '../Preferences.jsx'
import './AuthModal.css'

function SettingsModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <Preferences />
      </div>
    </div>
  )
}

export default SettingsModal
