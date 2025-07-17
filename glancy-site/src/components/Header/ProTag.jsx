import { useTheme } from '../../ThemeContext.jsx'
import proLight from '../../assets/pro-tag-light.svg'
import proDark from '../../assets/pro-tag-dark.svg'

function ProTag({ small }) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === 'dark' ? proDark : proLight
  const className = small ? 'pro-tag-small' : 'pro-tag'
  return <img src={src} className={className} alt="PRO" />
}

export default ProTag
