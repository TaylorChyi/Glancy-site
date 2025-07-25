import { useState } from 'react'
import './Toolbar.css'
import { useLanguage } from '../../LanguageContext.jsx'
import useOutsideToggle from '../../hooks/useOutsideToggle.js'

function ModelSelector() {
  const { open, setOpen, ref: menuRef } = useOutsideToggle(false)
  const [model, setModel] = useState(
    () => localStorage.getItem('dictionaryModel') || 'model-a'
  )
  const { t } = useLanguage()

  const selectModel = (value) => {
    setModel(value)
    localStorage.setItem('dictionaryModel', value)
    setOpen(false)
  }

  return (
    <div className="toolbar-section model-selector" ref={menuRef}>
      <button
        type="button"
        className="model-btn"
        onClick={() => setOpen(!open)}
      >
        {model === 'model-a' ? t.modelA : t.modelB} ▾
      </button>
      {open && (
        <div className="model-menu">
          <button type="button" onClick={() => selectModel('model-a')}>
            {t.modelA}
          </button>
          <button type="button" onClick={() => selectModel('model-b')}>
            {t.modelB}
          </button>
        </div>
      )}
    </div>
  )
}

export default ModelSelector
