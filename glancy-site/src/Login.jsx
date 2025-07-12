import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const resp = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!resp.ok) {
        throw new Error('登录失败')
      }
      const data = await resp.json()
      if (data.username === 'admin') {
        navigate('/portal')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="App">
      <h2>用户登录</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">用户名：</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">密码：</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">登录</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login
