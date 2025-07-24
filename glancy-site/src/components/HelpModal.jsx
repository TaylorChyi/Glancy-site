import Faq from '../Faq.jsx'
import Modal from './Modal.jsx'
import './HelpModal.css'

function HelpModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className="help-modal">
      <Faq />
    </Modal>
  )
}

export default HelpModal
