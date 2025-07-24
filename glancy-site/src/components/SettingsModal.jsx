import Preferences from '../Preferences.jsx'
import Modal from './Modal.jsx'
import './AuthModal.css'

function SettingsModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className="auth-modal">
      <Preferences />
    </Modal>
  )
}

export default SettingsModal
