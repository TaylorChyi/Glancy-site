import { useTheme } from '../../ThemeContext.jsx'
import proLight from '../../assets/pro-tag-light.svg'
import proDark from '../../assets/pro-tag-dark.svg'

function ProTag({ small }) {
  const { theme } = useTheme()
  const current =
    theme === 'system' ? document.documentElement.dataset.theme : theme
  const src = current === 'dark' ? proDark : proLight
  const className = small ? 'pro-tag-small' : 'pro-tag'
  return <img src={src} className={className} alt="PRO" />
}

export default ProTag
