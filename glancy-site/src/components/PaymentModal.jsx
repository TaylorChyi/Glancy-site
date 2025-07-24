import Modal from './Modal.jsx'
import styles from './PaymentModal.module.css'
import { useLanguage } from '../LanguageContext.jsx'

function PaymentModal({ open, onClose }) {
  const { t } = useLanguage()
  if (!open) return null
  return (
    <Modal onClose={onClose} className={styles.paymentModal}>
      <h3>{t.paymentTitle}</h3>
      <div className={styles.methods}>
        <button type="button">{t.alipay}</button>
        <button type="button">{t.wechat}</button>
      </div>
      <button type="button" onClick={onClose} className={styles.closeBtn}>
        {t.close}
      </button>
    </Modal>
  )
}

export default PaymentModal
