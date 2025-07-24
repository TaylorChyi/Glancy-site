import Profile from '../Profile.jsx'
import Modal from './Modal.jsx'
import styles from './ProfileModal.module.css'

function ProfileModal({ open, onClose }) {
  if (!open) return null
  return (
    <Modal onClose={onClose} className={styles['profile-modal']}>
      <Profile onCancel={onClose} />
    </Modal>
  )
}

export default ProfileModal
