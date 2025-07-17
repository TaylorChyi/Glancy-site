import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
import { LanguageProvider, useLanguage } from './LanguageContext.jsx'
import { translations } from './translations.js'
import './App.css'

function Nav() {
  const { t, setLang, lang } = useLanguage()
  return (
    <nav>
      <Link to="/">{t.navHome}</Link> | <Link to="/login">{t.navLogin}</Link> |
      <Link to="/register">{t.navRegister}</Link> |{' '}
      <Link to="/users">{t.navUsers}</Link> | <Link to="/search">{t.navSearch}</Link> |
      <Link to="/chat">{t.navChat}</Link> | <Link to="/faq">{t.navFaq}</Link> | <Link to="/contact">{t.navContact}</Link> |
      <Link to="/contact">{t.navContact}</Link> | <Link to="/portal/login">{t.navAdmin}</Link> |
      <Link to="/portal/login">{t.navAdmin}</Link>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {Object.keys(translations).map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </nav>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
