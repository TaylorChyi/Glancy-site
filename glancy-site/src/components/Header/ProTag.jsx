import { useTheme } from '../../ThemeContext.jsx'
import { ProTagLightIcon, ProTagDarkIcon } from '../Icon'

function ProTag({ small }) {
  const { resolvedTheme } = useTheme()
  const IconComponent =
    resolvedTheme === 'dark' ? ProTagDarkIcon : ProTagLightIcon
  const className = small ? 'pro-tag-small' : 'pro-tag'
  return <IconComponent className={className} />
}

export default ProTag
