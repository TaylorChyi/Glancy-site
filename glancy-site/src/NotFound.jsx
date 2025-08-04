import { useLanguage } from './LanguageContext.jsx'
import styles from './NotFound.module.css'

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.notFoundTitle}</h1>
      <p className={styles.message}>{t.notFoundMessage}</p>
    </div>
  )
}

export default NotFound

