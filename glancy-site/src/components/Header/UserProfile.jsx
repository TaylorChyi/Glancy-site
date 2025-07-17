import { useEffect, useState } from 'react'
import './Header.css'

function UserProfile() {
  const [name, setName] = useState('')

  useEffect(() => {
    fetch('/api/users/profile')
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
