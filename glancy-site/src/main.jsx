import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import Loader from './components/Loader.jsx'

import App from './App.jsx'
const Login = lazy(() => import('./Login.jsx'))
const Register = lazy(() => import('./Register.jsx'))
const NotFound = lazy(() => import('./NotFound.jsx'))
import { LanguageProvider } from './LanguageContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { ApiProvider } from './context/ApiContext.jsx'
import { MessageProvider } from './context/MessageContext.jsx'
import { createEventBus } from './services/EventBus.js'
import { setupTheme } from './theme/initTheme.js'

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

setupTheme()
const eventBus = createEventBus()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewportHeightUpdater />
      <AppProvider>
        <ApiProvider>
          <LanguageProvider>
            <ThemeProvider>
              <MessageProvider bus={eventBus}>
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
              </MessageProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ApiProvider>
      </AppProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
