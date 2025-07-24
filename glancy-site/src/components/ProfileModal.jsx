import './ProfileModal.css'
import Profile from '../Profile.jsx'

function ProfileModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <Profile onCancel={onClose} />
      </div>
    </div>
  )
}

export default ProfileModal
