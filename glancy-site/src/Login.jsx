import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const resp = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(text || '登录失败')
      }
      const data = await resp.json()
      setMessage(`欢迎，${data.username}`)
      if (data.username === 'admin') {
        navigate('/portal')
      } else {
        navigate('/')
      }
    } catch (err) {
      setMessage(err.message)
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
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default Login
