import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Profile() {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/users/profile')
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username)
        setAvatar(data.avatar)
      })
      .catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    if (avatar) {
      formData.append('avatar', avatar)
    }
    await fetch('/api/users/profile', {
      method: 'POST',
      body: formData
    })
    setMessage(t.updateSuccess)
  }

  const handleBind = async () => {
    await fetch('/api/bind/third-party')
    setMessage(t.bindSuccess)
  }

  return (
    <div className="App">
      <h2>{t.profileTitle}</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>{t.username}</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>{t.avatar}</label>
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <button type="submit">{t.saveButton}</button>
      </form>
      <button onClick={handleBind}>{t.bindButton}</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Profile
