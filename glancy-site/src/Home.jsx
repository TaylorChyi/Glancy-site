import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import lightLogo from './assets/glancy-light.svg'
import darkLogo from './assets/glancy-dark.svg'
import LanguageSelector from './components/Sidebar/LanguageSelector.jsx'
import HistoryList from './components/Sidebar/HistoryList.jsx'
import Favorites from './components/Sidebar/Favorites.jsx'
import UserMenu from './components/Header/UserMenu.jsx'
import ViewModeToggle from './components/Header/ViewModeToggle.jsx'
import ModelSelector from './components/Toolbar/ModelSelector.jsx'
import VoiceInputButton from './components/Toolbar/VoiceInputButton.jsx'
import ClearButton from './components/Toolbar/ClearButton.jsx'

function Home() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const current = theme === "system" ? document.documentElement.dataset.theme : theme
  const logo = current === 'dark' ? darkLogo : lightLogo
  const appName = lang === 'zh' ? '格律词典' : 'Glancy'

  const refresh = () => {
    fetch('/api/users/count')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {})
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-brand">
          <img src={logo} alt="logo" />
          <span className="app-name">{appName}</span>
        </div>
        <div className="header-right">
          <ViewModeToggle />
          <UserMenu />
        </div>
      </header>
      <aside>
        <LanguageSelector />
        <HistoryList />
        <Favorites />
      </aside>
      <p>{t.userCount}: {count}</p>
      <button onClick={refresh}>{t.refresh}</button>
      <div className="toolbar">
        <ModelSelector />
        <VoiceInputButton />
        <ClearButton onClear={() => setCount(0)} />
      </div>
    </div>
  )
}

export default Home
