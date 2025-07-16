import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Notifications() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])

  const fetchData = () => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
  }

  useEffect(() => {
    fetchData()
  }, [])

  const markRead = async (id) => {
    await fetch(`/api/notifications/${id}`, { method: 'POST' })
    fetchData()
  }

  return (
    <div className="App">
      <h2>{t.notifications}</h2>
      <ul>
        {items.map((n) => (
          <li key={n.id}>
            {n.text}
            {!n.read && <button onClick={() => markRead(n.id)}>{t.markRead}</button>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
