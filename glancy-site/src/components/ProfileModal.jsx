import Profile from '../Profile.jsx'
import BaseModal from './BaseModal.jsx'
import styles from './ProfileModal.module.css'

function ProfileModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} className={styles['profile-modal']}>
      <Profile onCancel={onClose} />
    </BaseModal>
  )
}

export default ProfileModal
