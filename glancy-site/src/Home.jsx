import './App.css'
import { useLanguage } from './LanguageContext.jsx'

function Home() {
  const { t } = useLanguage()
  return (
    <div className="App">
      <h1>{t.welcomeTitle}</h1>
      <p>{t.welcomeMsg}</p>
    </div>
  )
}

export default Home
