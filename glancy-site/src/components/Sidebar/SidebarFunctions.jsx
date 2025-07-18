import Favorites from './Favorites.jsx'
import HistoryList from './HistoryList.jsx'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function SidebarFunctions() {
  const user = useUserStore((s) => s.user)
  return (
    <div className="sidebar-functions">
      {user && <Favorites />}
      {user && <HistoryList />}
    </div>
  )
}

export default SidebarFunctions
