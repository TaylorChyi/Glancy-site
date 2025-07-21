import { useState, useEffect } from 'react'
import './App.css'
import './Profile.css'
import Avatar from './components/Avatar.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { apiRequest } from './api/client.js'
import { useUserStore } from './store/userStore.js'

function Profile({ onCancel }) {
  const { t } = useLanguage()
  const currentUser = useUserStore((s) => s.user)
  const [username, setUsername] = useState(currentUser?.username || '')
  const [email, setEmail] = useState(currentUser?.email || '')
  const [phone, setPhone] = useState(currentUser?.phone || '')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [interests, setInterests] = useState('')
  const [goal, setGoal] = useState('')
  const [avatar, setAvatar] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [editable, setEditable] = useState({
    username: false,
    email: false,
    phone: false
  })

  useEffect(() => {
    apiRequest(API_PATHS.profile)
      .then((data) => {
        setUsername(data.username)
        setEmail(data.email)
        setPhone(data.phone)
        setAge(data.age)
        setGender(data.gender)
        setInterests(data.interests)
        setGoal(data.goal)
        setAvatar(data.avatar)
      })
      .catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('interests', interests)
    formData.append('goal', goal)
    if (avatar) {
      formData.append('avatar', avatar)
    }
    await apiRequest(API_PATHS.profile, {
      method: 'POST',
      body: formData
    })
    setPopupMsg(t.updateSuccess)
    setPopupOpen(true)
  }

  const handleBind = async () => {
    await apiRequest(API_PATHS.bindThirdParty)
    setPopupMsg(t.bindSuccess)
    setPopupOpen(true)
  }

  return (
    <div className="App">
      <h2>{t.profileTitle}</h2>
      <form onSubmit={handleSave} className="profile-card">
        <div className="avatar-area">
          {avatar && typeof avatar === 'string' ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <Avatar width={100} height={100} style={{ borderRadius: '20px' }} />
          )}
          <span className="avatar-hint">{t.avatarHint}</span>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            style={{ position: 'absolute', inset: 0, opacity: 0 }}
          />
        </div>
        <div className="editable-item">
          <input
            className="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.usernamePlaceholder}
            disabled={!editable.username}
          />
          {!editable.username && (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditable({ ...editable, username: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className="editable-item">
          <input
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            disabled={!editable.email}
          />
          {!editable.email && (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditable({ ...editable, email: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className="editable-item">
          <input
            className="phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            disabled={!editable.phone}
          />
          {!editable.phone && (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditable({ ...editable, phone: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className="basic">
          <div className="item">
            <span>🎂 {t.ageLabel}</span>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t.agePlaceholder}
            />
            <span className="tooltip">
              ?<span className="tooltip-text">{t.ageHelp}</span>
            </span>
          </div>
          <div className="item">
            <span>👤 {t.genderLabel}</span>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder={t.genderPlaceholder}
            />
            <span className="tooltip">
              ?<span className="tooltip-text">{t.genderHelp}</span>
            </span>
          </div>
          <div className="item">
            <span>⭐ {t.interestsLabel}</span>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder={t.interestsPlaceholder}
            />
            <span className="tooltip">
              ?<span className="tooltip-text">{t.interestsHelp}</span>
            </span>
          </div>
          <div className="item">
            <span>🎯 {t.goalLabel}</span>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={t.goalPlaceholder}
            />
            <span className="tooltip">
              ?<span className="tooltip-text">{t.goalHelp}</span>
            </span>
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="save-btn">
            {t.saveButton}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            {t.cancelButton || '取消'}
          </button>
        </div>
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
