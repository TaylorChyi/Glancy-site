import './ShortcutsModal.css'
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
    { keys: `${mod} + Shift + K`, action: t.shortcutsOpenHelp },
  ]

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{t.shortcutsTitle}</h3>
        <ul>
          {shortcuts.map((s) => (
            <li key={s.keys}>
              <span className="keys">{s.keys}</span>
              <span className="desc">{s.action}</span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={onClose} className="close-btn">
          {t.close}
        </button>
      </div>
    </div>
  )
}

export default ShortcutsModal
