import './MessagePopup.css'

function MessagePopup({ open, message, onClose }) {
  if (!open) return null
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div>{message}</div>
        <button type="button" onClick={onClose} style={{ marginTop: '1rem' }}>
          Close
        </button>
      </div>
    </div>
  )
}

export default MessagePopup
