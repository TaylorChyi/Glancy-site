import { useEffect, useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'

function Faq() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(API_PATHS.faqs)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
  }, [])

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
