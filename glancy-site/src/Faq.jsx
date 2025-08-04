import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import { useApi } from './hooks/useApi.js'
import { useMessageService } from './context/MessageContext.jsx'

function Faq() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const api = useApi()
    const messageService = useMessageService()

  useEffect(() => {
    api.request(API_PATHS.faqs)
      .then((data) => setItems(data))
        .catch((err) => {
          console.error(err)
          messageService.show(t.fail)
        })
  }, [api, t, messageService])

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
    </div>
  )
}

export default Faq
