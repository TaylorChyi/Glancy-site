import './ShortcutsModal.css'
import { getModifierKey } from '../utils.js'

function ShortcutsModal({ open, onClose }) {
  if (!open) return null

  const mod = getModifierKey()
  const shortcuts = [
    { keys: `${mod} + Shift + F`, action: 'Focus search input' },
    { keys: `${mod} + Shift + L`, action: 'Switch language' },
    { keys: `${mod} + Shift + M`, action: 'Toggle theme' },
    { keys: `${mod} + Shift + K`, action: 'Open shortcuts help' },
  ]

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Keyboard Shortcuts</h3>
        <ul>
          {shortcuts.map((s) => (
            <li key={s.keys}>
              <span className="keys">{s.keys}</span>
              <span className="desc">{s.action}</span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  )
}

export default ShortcutsModal
