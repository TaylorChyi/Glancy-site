import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
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
  const { t } = useLanguage()
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal/login" element={<AdminLogin />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </BrowserRouter>
      <div className="App">
        <h1>{t.welcomeTitle}</h1>
        <p>{t.welcomeMsg}</p>
      </div>
    </>
  )
}

export default App
