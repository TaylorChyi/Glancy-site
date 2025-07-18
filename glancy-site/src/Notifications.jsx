import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'

function Notifications() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const fetchData = () => {
    fetch(API_PATHS.notifications)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {
        setPopupMsg('Failed to fetch notifications')
        setPopupOpen(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const markRead = async (id) => {
    await fetch(`${API_PATHS.notifications}/${id}`, { method: 'POST' })
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
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Notifications
