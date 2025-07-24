import Faq from '../Faq.jsx'
import Modal from './Modal.jsx'
import styles from './HelpModal.module.css'

function HelpModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className={styles['help-modal']}>
      <Faq />
    </Modal>
  )
}

export default HelpModal
