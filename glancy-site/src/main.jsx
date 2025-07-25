import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import Loader from './components/Loader.jsx'

const App = lazy(() => import('./App.jsx'))
const Login = lazy(() => import('./Login.jsx'))
const Register = lazy(() => import('./Register.jsx'))
import { LanguageProvider } from './LanguageContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { AppProvider } from './context/AppContext.jsx'

function updateVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}

updateVh()
window.addEventListener('resize', updateVh)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <LanguageProvider>
        <ThemeProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<App />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </AppProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
