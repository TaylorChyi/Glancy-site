import styles from './Modal.module.css'
import useEscapeKey from '@/hooks/useEscapeKey.js'

function Modal({ onClose, className = '', children }) {
  useEscapeKey(onClose)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
