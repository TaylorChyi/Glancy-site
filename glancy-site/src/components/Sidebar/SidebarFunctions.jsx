import Favorites from './Favorites.jsx'
import HistoryList from './HistoryList.jsx'
import './Sidebar.css'

function SidebarFunctions() {
  return (
    <div className="sidebar-functions">
      <Favorites />
      <HistoryList />
    </div>
  )
}

export default SidebarFunctions
