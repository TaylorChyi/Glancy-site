import { useEffect, useState } from 'react'
import '@/pages/App/App.css'
import { useLanguage } from '@/context/LanguageContext.jsx'
import { API_PATHS } from '@/config/api.js'
import { useApiResource } from '@/hooks/useApiResource.js'
import MessagePopup from '@/components/ui/MessagePopup.jsx'

function Faq() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const request = useApiResource('request')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    request(API_PATHS.faqs)
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err)
        setPopupMsg(t.fail)
        setPopupOpen(true)
      })
  }, [request, t])

  return (
    <div className="app">
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
