import { useHistory } from '@/context'
import EmptyState from '@/components/ui/EmptyState'
import styles from './HistoryDisplay.module.css'

function HistoryDisplay({ emptyMessage = 'No history' }) {
  const { history } = useHistory()
  if (!history.length) {
    return <EmptyState message={emptyMessage} />
  }
  return (
    <ul className={styles['history-grid-display']}>
      {history.map((h, i) => (
        <li key={i}>{h}</li>
      ))}
    </ul>
  )
}

export default HistoryDisplay
