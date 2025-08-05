import { useState } from 'react'
import Sidebar from '../Sidebar'
import DesktopTopBar from '../TopBar/DesktopTopBar.jsx'
import MobileTopBar from '../TopBar/MobileTopBar.jsx'
import { useIsMobile } from '../../utils/index.js'
import styles from './Layout.module.css'

function Layout({ children, sidebarProps = {}, topBarProps = {}, bottomContent = null }) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Sidebar
        {...sidebarProps}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <div className={styles.main}>
        <div className={styles['main-top']}>
          {isMobile ? (
            <MobileTopBar
              {...topBarProps}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          ) : (
            <DesktopTopBar {...topBarProps} />
          )}
        </div>
        <div className={styles['main-middle']}>{children}</div>
        <div className={styles['main-bottom']}>{bottomContent}</div>
      </div>
    </div>
  )
}

export default Layout
