import UserMenu from '../Header/UserMenu.jsx'
import styles from './Sidebar.module.css'

function SidebarUser() {
  return (
    <div className={styles.sidebarUser}>
      <UserMenu size={32} showName />
    </div>
  )
}

export default SidebarUser
