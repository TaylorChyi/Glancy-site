import { useEffect, useState } from 'react'
import { useLanguage } from '../../LanguageContext.jsx'
import './Header.css'
import { API_PATHS } from '../../config/api.js'
import { apiRequest } from '../../api/client.js'

function UserProfile() {
  const [name, setName] = useState('')
  const { t } = useLanguage()

  useEffect(() => {
    apiRequest(API_PATHS.profile)
      .then((data) => {
        if (data.username) {
          setName(data.username)
        }
      })
      .catch(() => {})
  }, [])

  return <div className="header-section">{name || t.guest}</div>
}

export default UserProfile
