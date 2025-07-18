import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'

function Profile() {
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  useEffect(() => {
    fetch(API_PATHS.profile)
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
    const resp = await fetch(API_PATHS.profile, {
      method: 'POST',
      body: formData
    })
    setPopupMsg(resp.ok ? t.updateSuccess : t.submitFail)
    setPopupOpen(true)
  }

  const handleBind = async () => {
    const resp = await fetch(API_PATHS.bindThirdParty)
    setPopupMsg(resp.ok ? t.bindSuccess : t.submitFail)
    setPopupOpen(true)
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
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Profile
