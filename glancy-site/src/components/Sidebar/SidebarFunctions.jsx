import Favorites from './Favorites.jsx'
import HistoryList from './HistoryList.jsx'
import { useUserStore } from '../../store/userStore.js'
import './Sidebar.css'

function SidebarFunctions({ onToggleFavorites, onSelectHistory }) {
  const user = useUserStore((s) => s.user)
  return (
    <div className="sidebar-functions">
      {user && <Favorites onToggle={onToggleFavorites} />}
      <HistoryList onSelect={onSelectHistory} />
    </div>
  )
}

export default SidebarFunctions
