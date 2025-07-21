import { useState } from 'react'
import './Toolbar.css'
import { useLanguage } from '../../LanguageContext.jsx'

function ModelSelector() {
  const [model, setModel] = useState('model-a')
  const { t } = useLanguage()

  return (
    <div className="toolbar-section">
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="model-a">{t.modelA}</option>
        <option value="model-b">{t.modelB}</option>
      </select>
    </div>
  )
}

export default ModelSelector
