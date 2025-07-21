import { useEffect, useState } from 'react'
import './Header.css'
import { API_PATHS } from '../../config/api.js'
import { apiRequest } from '../../api/client.js'

function UserProfile() {
  const [name, setName] = useState('')

  useEffect(() => {
    apiRequest(API_PATHS.profile)
      .then((data) => {
        if (data.username) {
          setName(data.username)
        }
      })
      .catch(() => {})
  }, [])

  return <div className="header-section">{name || 'Guest'}</div>
}

export default UserProfile
