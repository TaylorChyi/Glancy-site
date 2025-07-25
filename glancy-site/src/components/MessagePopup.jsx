import { useEffect } from 'react'
import styles from './MessagePopup.module.css'

function MessagePopup({ open, message, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className={styles['popup-overlay']} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div>{message}</div>
        <button
          type="button"
          onClick={onClose}
          className={styles['close-btn']}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default MessagePopup
