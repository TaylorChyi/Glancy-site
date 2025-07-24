import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import { useApi } from './hooks/useApi.js'
import MessagePopup from './components/MessagePopup.jsx'

function Faq() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const api = useApi()
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    api(API_PATHS.faqs)
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err)
        setPopupMsg(t.fail)
        setPopupOpen(true)
      })
  }, [api, t])

  return (
    <div className="App">
      <h2>{t.faqTitle}</h2>
      <ul>
        {items.map((f) => (
          <li key={f.id}>
            <strong>{f.q}</strong>
            <p>{f.a}</p>
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

export default Faq
