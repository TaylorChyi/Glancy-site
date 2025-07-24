import Modal from './Modal.jsx'
import styles from './LogoutConfirmModal.module.css'
import { useLanguage } from '../LanguageContext.jsx'

function LogoutConfirmModal({ open, onConfirm, onCancel, email }) {
  const { t } = useLanguage()
  if (!open) return null
  const message = t.logoutConfirmMessage.replace('{email}', email)
  return (
    <Modal onClose={onCancel} className={styles.logoutModal}>
      <h3>{t.logoutConfirmTitle}</h3>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.logoutBtn} onClick={onConfirm}>
          {t.logout}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          {t.cancelButton}
        </button>
      </div>
    </Modal>
  )
}

export default LogoutConfirmModal
