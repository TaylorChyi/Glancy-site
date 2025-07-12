import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Portal from './Portal.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link> | <Link to="/login">登录</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
