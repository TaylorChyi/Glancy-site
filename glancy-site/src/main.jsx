import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
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
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)
