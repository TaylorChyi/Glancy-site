import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import Loader from './components/Loader.jsx'

const App = lazy(() => import('./App.jsx'))
const Login = lazy(() => import('./Login.jsx'))
const Register = lazy(() => import('./Register.jsx'))
const NotFound = lazy(() => import('./NotFound.jsx'))
import { LanguageProvider } from './LanguageContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { ApiProvider } from './context/ApiContext.jsx'
import { LocaleProvider } from './LocaleContext.jsx'

// eslint-disable-next-line react-refresh/only-export-components
function ViewportHeightUpdater() {
  useEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight}px`
      )
    }
    updateVh()
    window.addEventListener('resize', updateVh)
    return () => window.removeEventListener('resize', updateVh)
  }, [])
  return null
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewportHeightUpdater />
    <AppProvider>
      <ApiProvider>
        <LocaleProvider>
          <LanguageProvider>
            <ThemeProvider>
              <BrowserRouter>
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      <Route path="/" element={<App />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </BrowserRouter>
            </ThemeProvider>
          </LanguageProvider>
        </LocaleProvider>
      </ApiProvider>
    </AppProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
