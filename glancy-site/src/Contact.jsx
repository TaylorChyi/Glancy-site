import { useState } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Contact() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message: msg })
    })
    setInfo(resp.ok ? t.submitSuccess : t.submitFail)
  }

  return (
    <div className="App">
      <h2>{t.contactTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t.name}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>{t.email}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>{t.message}</label>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
        </div>
        <button type="submit">{t.submit}</button>
        {info && <p>{info}</p>}
      </form>
    </div>
  )
}

export default Contact
