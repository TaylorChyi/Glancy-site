import UserMenu from '../Header/UserMenu.jsx'
import './Sidebar.css'

function SidebarUser() {
  return (
    <div className="sidebar-user">
      <UserMenu size={32} showName />
    </div>
  )
}

export default SidebarUser
