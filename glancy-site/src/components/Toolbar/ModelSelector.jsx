import { useState } from 'react'
import './Toolbar.css'
import { useLanguage } from '../../LanguageContext.jsx'

function ModelSelector() {
  const [model, setModel] = useState(
    () => localStorage.getItem('dictionaryModel') || 'model-a'
  )
  const { t } = useLanguage()

  const handleChange = (e) => {
    const value = e.target.value
    setModel(value)
    localStorage.setItem('dictionaryModel', value)
  }

  return (
    <div className="toolbar-section">
      <select value={model} onChange={handleChange}>
        <option value="model-a">{t.modelA}</option>
        <option value="model-b">{t.modelB}</option>
      </select>
    </div>
  )
}

export default ModelSelector
