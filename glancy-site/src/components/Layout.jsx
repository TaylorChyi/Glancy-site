import { useState } from 'react'
import Sidebar from './Sidebar'
import DesktopTopBar from './DesktopTopBar.jsx'
import MobileTopBar from './MobileTopBar.jsx'
import { useIsMobile } from '../utils.js'

function Layout({ children, sidebarProps = {}, topBarProps = {} }) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="grid-main">
      <Sidebar
        {...sidebarProps}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <div className="layout-main flex-column">
        {isMobile ? (
          <header className="topbar">
            <MobileTopBar
              {...topBarProps}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          </header>
        ) : (
          <DesktopTopBar {...topBarProps} />
        )}
        <main className="layout-content flex-column">{children}</main>
      </div>
    </div>
  )
}

export default Layout
