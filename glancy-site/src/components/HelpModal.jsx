import Faq from '../Faq.jsx'
import './HelpModal.css'

function HelpModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <Faq />
      </div>
    </div>
  )
}

export default HelpModal
