import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import LanguageSelector from './components/Sidebar/LanguageSelector.jsx'
import HistoryList from './components/Sidebar/HistoryList.jsx'
import Favorites from './components/Sidebar/Favorites.jsx'
import UserProfile from './components/Header/UserProfile.jsx'
import SettingsMenu from './components/Header/SettingsMenu.jsx'
import ViewModeToggle from './components/Header/ViewModeToggle.jsx'
import ModelSelector from './components/Toolbar/ModelSelector.jsx'
import VoiceInputButton from './components/Toolbar/VoiceInputButton.jsx'
import ClearButton from './components/Toolbar/ClearButton.jsx'

function Home() {
  const { t } = useLanguage()
  const [count, setCount] = useState(0)

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
      <header>
        <UserProfile />
        <SettingsMenu />
        <ViewModeToggle />
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
