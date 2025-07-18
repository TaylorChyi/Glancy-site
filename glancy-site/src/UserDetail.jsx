import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'

function UserDetail() {
  const { t } = useLanguage()
  const { id } = useParams()
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_PATHS.users}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username)
      })
      .catch(() => {})
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const resp = await fetch(`${API_PATHS.users}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
    setMessage(resp.ok ? t.updateSuccess : t.submitFail)
  }

  return (
    <div className="App">
      <h2>{t.userDetail}</h2>
      <p>ID: {id}</p>
      <form onSubmit={handleUpdate}>
        <label>
          {t.username}
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">{t.updateButton}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default UserDetail
