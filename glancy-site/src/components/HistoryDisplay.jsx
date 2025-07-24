import { useHistory } from '../context/AppContext.jsx'
import './HistoryDisplay.css'

function HistoryDisplay() {
  const { history } = useHistory()
  if (!history.length) {
    return (
      <div className="display-content">
        <div className="display-term">No history</div>
      </div>
    )
  }
  return (
    <ul className="history-grid-display">
      {history.map((h, i) => (
        <li key={i}>{h}</li>
      ))}
    </ul>
  )
}

export default HistoryDisplay
