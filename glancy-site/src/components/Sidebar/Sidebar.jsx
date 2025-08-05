import Brand from '@/components/Brand'
import SidebarFunctions from './SidebarFunctions.jsx'
import SidebarUser from './SidebarUser.jsx'
import useMediaQuery from '@/hooks/useMediaQuery.js'

const MOBILE_QUERY = '(max-width: 600px)'

function Sidebar({
  isMobile: mobileProp,
  open = false,
  onClose,
  onToggleFavorites,
  onSelectHistory
}) {
  const defaultMobile = useMediaQuery(MOBILE_QUERY)
  const isMobile = mobileProp ?? defaultMobile
  return (
    <>
      {isMobile && open && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`sidebar${isMobile ? (open ? ' mobile-open' : '') : ''}`}>
        <Brand />
        <SidebarFunctions
          onToggleFavorites={onToggleFavorites}
          onSelectHistory={onSelectHistory}
        />
        <SidebarUser />
      </aside>
    </>
  )
}

export default Sidebar
