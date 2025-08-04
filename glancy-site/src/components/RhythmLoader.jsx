import styles from './RhythmLoader.module.css'

function RhythmLoader() {
  return (
    <div className={styles.loader} role="status" aria-label="loading">
      <svg className={styles.svg} viewBox="0 0 120 40">
        <circle className={styles.dot} cx="15" cy="20" r="5" />
        <circle className={styles.dot} cx="35" cy="20" r="5" />
        <circle className={styles.dot} cx="55" cy="20" r="5" />
        <rect className={styles.bar} x="70" y="10" width="10" height="20" rx="3" />
        <rect className={styles.bar} x="90" y="10" width="10" height="20" rx="3" />
        <rect className={styles.bar} x="110" y="10" width="10" height="20" rx="3" />
      </svg>
    </div>
  )
}

export default RhythmLoader

