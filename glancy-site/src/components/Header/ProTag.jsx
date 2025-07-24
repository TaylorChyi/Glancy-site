import { useTheme } from '../../ThemeContext.jsx'
import proLight from '../../assets/pro-tag-light.svg'
import proDark from '../../assets/pro-tag-dark.svg'
import styles from './Header.module.css'

function ProTag({ small }) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === 'dark' ? proDark : proLight
  const className = small ? styles.proTagSmall : styles.proTag
  return <img src={src} className={className} alt="PRO" />
}

export default ProTag
