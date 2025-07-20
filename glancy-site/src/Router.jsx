import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Users from './Users.jsx'
import UserDetail from './UserDetail.jsx'
import Search from './Search.jsx'
import Notifications from './Notifications.jsx'
import Portal from './Portal.jsx'
import AdminLogin from './AdminLogin.jsx'
import Profile from './Profile.jsx'
import Preferences from './Preferences.jsx'
import Contact from './Contact.jsx'
import Faq from './Faq.jsx'
import Home from './Home.jsx'
import Chat from './Chat.jsx'
import { Routes, Route } from 'react-router-dom'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/portal/login" element={<AdminLogin />} />
      <Route path="*" element={<App />} />
    </Routes>
  )
}
