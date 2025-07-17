import { Link } from 'react-router-dom'
import './Header.css'

function SettingsMenu() {
  return (
    <div className="header-section">
      <Link to="/preferences">Settings</Link>
    </div>
  )
}

export default SettingsMenu
