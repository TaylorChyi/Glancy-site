import Brand from '../Brand.jsx'
import SidebarFunctions from './SidebarFunctions.jsx'
import SidebarUser from './SidebarUser.jsx'
import { useIsMobile } from '../../utils.js'
import styles from './Sidebar.module.css'

function Sidebar({
  isMobile: mobileProp,
  open = false,
  onClose,
  onToggleFavorites,
  onSelectHistory
}) {
  const defaultMobile = useIsMobile()
  const isMobile = mobileProp ?? defaultMobile
  return (
    <>
      {isMobile && open && (
        <div className={styles['sidebar-overlay']} onClick={onClose} />
      )}
      <aside
        className={`${styles.sidebar}${isMobile ? (open ? ` ${styles['mobile-open']}` : '') : ''}`}
      >
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
