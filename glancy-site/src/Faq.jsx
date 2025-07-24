import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import { useApi } from './hooks/useApi.js'

function Faq() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const api = useApi()

  useEffect(() => {
    api(API_PATHS.faqs)
      .then((data) => setItems(data))
      .catch(() => {})
  }, [api])

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
    </div>
  )
}

export default Faq
