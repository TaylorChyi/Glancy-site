import { useTheme } from '../../ThemeContext.jsx'
import './Header.css'

function ViewModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="header-section">
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}

export default ViewModeToggle
