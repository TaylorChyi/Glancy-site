import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { useLanguage } from './LanguageContext.jsx'
import { API_PATHS } from './config/api.js'

function Users() {
  const { t } = useLanguage()
  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    fetch(API_PATHS.users)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => {})
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    await fetch(`${API_PATHS.users}/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  return (
    <div className="App">
      <h2>{t.userList}</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.username}</Link>
            <button onClick={() => handleDelete(u.id)}>{t.deleteButton}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
