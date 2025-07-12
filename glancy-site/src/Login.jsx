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

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const resp = await fetch('http://localhost:8080/api/users/login', {
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
        const text = await resp.text()
        throw new Error(text || '登录失败')
      }
      const data = await resp.json()
      setMessage(`欢迎，${data.username}`)
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">登录</button>
      {message && <p>{message}</p>}
    </form>
  )
}
