import { useState, useEffect } from 'react'
import appStyles from './App.module.css'
import styles from './Profile.module.css'
import Avatar from './components/Avatar.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'
import MessagePopup from './components/MessagePopup.jsx'
import { useApi } from './hooks/useApi.js'
import { useUser } from './context/AppContext.jsx'

function Profile({ onCancel }) {
  const { t } = useLanguage()
  const { user: currentUser } = useUser()
  const api = useApi()
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
    api(API_PATHS.profile)
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
    await api(API_PATHS.profile, {
      method: 'POST',
      body: formData
    })
    setPopupMsg(t.updateSuccess)
    setPopupOpen(true)
  }


  return (
    <div className={appStyles.App}>
      <h2>{t.profileTitle}</h2>
      <form onSubmit={handleSave} className={styles['profile-card']}>
        <div className={styles['avatar-area']}>
          {avatar && typeof avatar === 'string' ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <Avatar width={100} height={100} style={{ borderRadius: '20px' }} />
          )}
          <span className={styles['avatar-hint']}>{t.avatarHint}</span>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            style={{ position: 'absolute', inset: 0, opacity: 0 }}
          />
        </div>
        <div className={styles['editable-item']}>
          <input
            className={styles['username-input']}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.usernamePlaceholder}
            disabled={!editable.username}
          />
          {!editable.username && (
            <button
              type="button"
              className={styles['edit-btn']}
              onClick={() => setEditable({ ...editable, username: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className={styles['editable-item']}>
          <input
            className={styles['email-input']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            disabled={!editable.email}
          />
          {!editable.email && (
            <button
              type="button"
              className={styles['edit-btn']}
              onClick={() => setEditable({ ...editable, email: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className={styles['editable-item']}>
          <input
            className={styles['phone-input']}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            disabled={!editable.phone}
          />
          {!editable.phone && (
            <button
              type="button"
              className={styles['edit-btn']}
              onClick={() => setEditable({ ...editable, phone: true })}
            >
              {t.editButton}
            </button>
          )}
        </div>
        <div className={styles.basic}>
          <div className={styles.item}>
            <span>🎂 {t.ageLabel}</span>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t.agePlaceholder}
            />
            <span className={styles.tooltip}>
              ?<span className={styles['tooltip-text']}>{t.ageHelp}</span>
            </span>
          </div>
          <div className={styles.item}>
            <span>👤 {t.genderLabel}</span>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder={t.genderPlaceholder}
            />
            <span className={styles.tooltip}>
              ?<span className={styles['tooltip-text']}>{t.genderHelp}</span>
            </span>
          </div>
          <div className={styles.item}>
            <span>⭐ {t.interestsLabel}</span>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder={t.interestsPlaceholder}
            />
            <span className={styles.tooltip}>
              ?<span className={styles['tooltip-text']}>{t.interestsHelp}</span>
            </span>
          </div>
          <div className={styles.item}>
            <span>🎯 {t.goalLabel}</span>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={t.goalPlaceholder}
            />
            <span className={styles.tooltip}>
              ?<span className={styles['tooltip-text']}>{t.goalHelp}</span>
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles['save-btn']}>
            {t.saveButton}
          </button>
          <button type="button" className={styles['cancel-btn']} onClick={onCancel}>
            {t.cancelButton || '取消'}
          </button>
        </div>
      </form>
      <MessagePopup
        open={popupOpen}
        message={popupMsg}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  )
}

export default Profile
