import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

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
      <p>{t.userCount}: {count}</p>
      <button onClick={refresh}>{t.refresh}</button>
    </div>
  )
}

export default Home
