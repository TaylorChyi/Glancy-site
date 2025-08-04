import { useState, useEffect } from 'react'
import './App.css'
import styles from './Preferences.module.css'
import { useLanguage } from './LanguageContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import { useUser } from './context/AppContext.jsx'
import { API_PATHS } from './config/api.js'
import { useApi } from './hooks/useApi.js'
import { useMessageService } from './context/MessageContext.jsx'
import { useModelStore } from './store/modelStore.ts'

function Preferences() {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const api = useApi()
  const { model, setModel } = useModelStore()
  const [models, setModels] = useState([])
  const [sourceLang, setSourceLang] = useState(
    localStorage.getItem('sourceLang') || 'auto'
  )
  const [targetLang, setTargetLang] = useState(
    localStorage.getItem('targetLang') || 'ENGLISH'
  )
  const [defaultModel, setDefaultModel] = useState(model)
    const messageService = useMessageService()

  useEffect(() => {
    api.llm
      .fetchModels()
      .then((list) => setModels(list))
      .catch((err) => console.error(err))
  }, [api])

  useEffect(() => {
    if (!user) return
    api.request(`${API_PATHS.preferences}/user/${user.id}`)
      .then((data) => {
        const sl = data.systemLanguage || 'auto'
        const tl = data.searchLanguage || 'ENGLISH'
        const dm = data.dictionaryModel || model
        setSourceLang(sl)
        setTargetLang(tl)
        setDefaultModel(dm)
        setModel(dm)
        localStorage.setItem('sourceLang', sl)
        localStorage.setItem('targetLang', tl)
        setTheme(data.theme || 'system')
      })
        .catch((err) => {
          console.error(err)
          messageService.show(t.fail)
        })
  }, [setTheme, t, user, api, model, setModel, messageService])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) return
    await api.request(`${API_PATHS.preferences}/user/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemLanguage: sourceLang,
        searchLanguage: targetLang,
        dictionaryModel: defaultModel,
        theme
      })
    })
    localStorage.setItem('sourceLang', sourceLang)
    localStorage.setItem('targetLang', targetLang)
    setModel(defaultModel)
      messageService.show(t.saveSuccess)
  }

  return (
    <div className="app">
      <h2>{t.prefTitle}</h2>
      <form className={styles['preferences-form']} onSubmit={handleSave}>
        <div>
          <label>{t.prefLanguage}</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="auto">{t.autoDetect}</option>
            <option value="CHINESE">CHINESE</option>
            <option value="ENGLISH">ENGLISH</option>
          </select>
        </div>
        <div>
          <label>{t.prefSearchLanguage}</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="CHINESE">CHINESE</option>
            <option value="ENGLISH">ENGLISH</option>
          </select>
        </div>
        <div>
          <label>{t.prefDictionaryModel}</label>
          <select
            value={defaultModel}
            onChange={(e) => setDefaultModel(e.target.value)}
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {t[m] || m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>{t.prefTheme}</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="system">system</option>
          </select>
        </div>
        <button type="submit">{t.saveButton}</button>
      </form>
    </div>
  )
}

export default Preferences
