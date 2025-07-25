import { UserMenu } from '../Header'
import './Sidebar.css'

function SidebarUser() {
  return (
    <div className="sidebar-user">
      <UserMenu size={32} showName />
    </div>
  )
}

export default SidebarUser
