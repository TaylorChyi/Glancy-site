import UserMenu from '../Header/UserMenu.jsx'
import styles from './Sidebar.module.css'

function SidebarUser() {
  return (
    <div className={styles['sidebar-user']}>
      <UserMenu size={32} showName />
    </div>
  )
}

export default SidebarUser
