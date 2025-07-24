import { useState, useRef, useEffect } from 'react'
import styles from './Toolbar.module.css'
import { useLanguage } from '../../LanguageContext.jsx'

function ModelSelector() {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(
    () => localStorage.getItem('dictionaryModel') || 'model-a'
  )
  const menuRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    function handlePointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('pointerdown', handlePointerDown)
    }
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  const selectModel = (value) => {
    setModel(value)
    localStorage.setItem('dictionaryModel', value)
    setOpen(false)
  }

  return (
    <div className={`${styles['toolbar-section']} ${styles['model-selector']}`} ref={menuRef}>
      <button
        type="button"
        className={styles['model-btn']}
        onClick={() => setOpen(!open)}
      >
        {model === 'model-a' ? t.modelA : t.modelB} ▾
      </button>
      {open && (
        <div className={styles['model-menu']}>
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
