import Faq from '../pages/faq/Faq.jsx'
import BaseModal from './BaseModal.jsx'
import styles from './HelpModal.module.css'

function HelpModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} className={styles['help-modal']}>
      <Faq />
    </BaseModal>
  )
}

export default HelpModal
