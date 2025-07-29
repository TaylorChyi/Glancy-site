import { useTheme } from '../ThemeContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import avatarLight from '../assets/default-user-avatar-light.svg'
import avatarDark from '../assets/default-user-avatar-dark.svg'

// 基于当前主题切换默认头像
function Avatar({ src, alt = 'User Avatar', ...props }) {
  const { resolvedTheme } = useTheme()
  const { user } = useUser()
  const defaultSrc = resolvedTheme === 'dark' ? avatarDark : avatarLight
  const finalSrc = src || user?.avatar || defaultSrc
  return <img src={finalSrc} alt={alt} {...props} />
}

export default Avatar
