import Profile from '../Profile.jsx'
import BaseModal from './BaseModal.jsx'
import './ProfileModal.css'

function ProfileModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} className="profile-modal">
      <Profile onCancel={onClose} />
    </BaseModal>
  )
}

export default ProfileModal
