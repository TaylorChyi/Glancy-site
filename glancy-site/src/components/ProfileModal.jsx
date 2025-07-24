import Profile from '../Profile.jsx'
import Modal from './Modal.jsx'
import './ProfileModal.css'

function ProfileModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className="profile-modal">
      <Profile onCancel={onClose} />
    </Modal>
  )
}

export default ProfileModal
