import Modal from './Modal.jsx'
import styles from './ShortcutsModal.module.css'
import { getModifierKey } from '../utils.js'
import { useLanguage } from '../LanguageContext.jsx'

function ShortcutsModal({ open, onClose }) {
  const { t } = useLanguage()
  if (!open) return null

  const mod = getModifierKey()
  const shortcuts = [
    { keys: `${mod} + Shift + F`, action: t.shortcutsFocusSearch },
    { keys: `${mod} + Shift + L`, action: t.shortcutsSwitchLanguage },
    { keys: `${mod} + Shift + M`, action: t.shortcutsToggleTheme },
    { keys: `${mod} + Shift + B`, action: t.shortcutsToggleFavorite },
    { keys: `${mod} + Shift + K`, action: t.shortcutsOpenHelp },
  ]

  return (
    <Modal onClose={onClose} className={styles.shortcutsModal}>
      <h3>{t.shortcutsTitle}</h3>
      <ul>
        {shortcuts.map((s) => (
          <li key={s.keys}>
            <span className={styles.keys}>{s.keys}</span>
            <span className={styles.desc}>{s.action}</span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onClose} className={styles.closeBtn}>
        {t.close}
      </button>
    </Modal>
  )
}

export default ShortcutsModal
