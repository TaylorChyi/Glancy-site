import styles from './EmptyState.module.css'

function EmptyState({ message, icon, children, className }) {
  const classes = [styles.container, className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {message && <div className={styles.message}>{message}</div>}
      {children}
    </div>
  )
}

export default EmptyState
