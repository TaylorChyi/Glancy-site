import { useEffect, useState } from 'react'
import './Header.css'
import { API_PATHS } from '../../config/api.js'

function UserProfile() {
  const [name, setName] = useState('')

  useEffect(() => {
    fetch(API_PATHS.profile)
      .then((res) => res.json())
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
