import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import { LanguageProvider } from './LanguageContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

function updateVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}

updateVh()
window.addEventListener('resize', updateVh)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
