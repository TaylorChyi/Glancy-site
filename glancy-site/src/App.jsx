import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Users from './Users.jsx'
import UserDetail from './UserDetail.jsx'
import Profile from './Profile.jsx'
import Preferences from './Preferences.jsx'
import Search from './Search.jsx'
import Chat from './Chat.jsx'
import Notifications from './Notifications.jsx'
import Faq from './Faq.jsx'
import Contact from './Contact.jsx'
import Health from './Health.jsx'
import AdminLogin from './AdminLogin.jsx'
import Portal from './Portal.jsx'
import Layout from './components/Layout.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health" element={<Health />} />
          <Route path="/portal/login" element={<AdminLogin />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
