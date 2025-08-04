import styles from './RhythmLoader.module.css'

function RhythmLoader() {
  return (
    <div className={styles.loader} role="status" aria-label="loading">
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={styles.shape} />
      ))}
    </div>
  )
}

export default RhythmLoader

