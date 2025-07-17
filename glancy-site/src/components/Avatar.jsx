import { useTheme } from '../ThemeContext.jsx'
import avatarLight from '../assets/default-user-avatar-light.svg'
import avatarDark from '../assets/default-user-avatar-dark.svg'

// 基于当前主题切换默认头像
function Avatar({ alt = 'User Avatar', ...props }) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === 'dark' ? avatarDark : avatarLight
  return <img src={src} alt={alt} {...props} />
}

export default Avatar
