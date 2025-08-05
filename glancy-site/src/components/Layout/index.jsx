import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import DesktopTopBar from '@/components/TopBar/DesktopTopBar.jsx'
import MobileTopBar from '@/components/TopBar/MobileTopBar.jsx'
import useMediaQuery from '@/hooks/useMediaQuery.js'
import styles from './Layout.module.css'

const MOBILE_QUERY = '(max-width: 600px)'

function Layout({ children, sidebarProps = {}, topBarProps = {}, bottomContent = null }) {
  const isMobile = useMediaQuery(MOBILE_QUERY)
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
