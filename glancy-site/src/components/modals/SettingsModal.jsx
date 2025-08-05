import Preferences from '@/pages/preferences'
import BaseModal from './BaseModal.jsx'
import styles from './SettingsModal.module.css'

function SettingsModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} className={styles['auth-modal']}>
      <Preferences />
    </BaseModal>
  )
}

export default SettingsModal
