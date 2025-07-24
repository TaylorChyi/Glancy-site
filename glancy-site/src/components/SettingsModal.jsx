import Preferences from '../Preferences.jsx'
import Modal from './Modal.jsx'
import styles from './AuthModal.module.css'

function SettingsModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className={styles['auth-modal']}>
      <Preferences />
    </Modal>
  )
}

export default SettingsModal
