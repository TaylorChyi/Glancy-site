import BaseModal from './BaseModal.jsx'
import './PaymentModal.css'
import { useLanguage } from '../LanguageContext.jsx'

function PaymentModal({ open, onClose }) {
  const { t } = useLanguage()
  return (
    <BaseModal open={open} onClose={onClose} className="payment-modal">
      <h3>{t.paymentTitle}</h3>
      <div className="methods">
        <button type="button">{t.alipay}</button>
        <button type="button">{t.wechat}</button>
      </div>
      <button type="button" onClick={onClose} className="close-btn">
        {t.close}
      </button>
    </BaseModal>
  )
}

export default PaymentModal
