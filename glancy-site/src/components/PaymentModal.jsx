import Modal from './Modal.jsx'
import './PaymentModal.css'
import { useLanguage } from '../LanguageContext.jsx'

function PaymentModal({ open, onClose }) {
  const { t } = useLanguage()
  if (!open) return null
  return (
    <Modal onClose={onClose} className="payment-modal">
      <h3>{t.paymentTitle}</h3>
      <div className="methods">
        <button type="button">{t.alipay}</button>
        <button type="button">{t.wechat}</button>
      </div>
      <button type="button" onClick={onClose} className="close-btn">
        {t.close}
      </button>
    </Modal>
  )
}

export default PaymentModal
