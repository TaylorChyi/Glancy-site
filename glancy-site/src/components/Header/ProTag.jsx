import { useTheme } from '../../ThemeContext.jsx'
import { ProTagLightIcon, ProTagDarkIcon } from '../ui/Icon'
import styles from './Header.module.css'

function ProTag({ small }) {
  const { resolvedTheme } = useTheme()
  const IconComponent =
    resolvedTheme === 'dark' ? ProTagDarkIcon : ProTagLightIcon
  const className = small ? styles['pro-tag-small'] : styles['pro-tag']
  return <IconComponent className={className} />
}

export default ProTag
