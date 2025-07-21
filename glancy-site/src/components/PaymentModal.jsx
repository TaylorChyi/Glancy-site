import './PaymentModal.css'

function PaymentModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Payment Method</h3>
        <div className="methods">
          <button type="button">Alipay</button>
          <button type="button">WeChat</button>
        </div>
        <button type="button" onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  )
}

export default PaymentModal
