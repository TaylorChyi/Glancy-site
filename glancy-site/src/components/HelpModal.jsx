import Faq from '../Faq.jsx'
import BaseModal from './BaseModal.jsx'
import './HelpModal.css'

function HelpModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} className="help-modal">
      <Faq />
    </BaseModal>
  )
}

export default HelpModal
