import { useTheme } from '../ThemeContext.jsx'
import avatarLight from '../assets/default-user-avatar-light.svg'
import avatarDark from '../assets/default-user-avatar-dark.svg'

// 基于当前主题切换默认头像
function Avatar({ alt = 'User Avatar', ...props }) {
  const { theme } = useTheme()
  const current =
    theme === 'system' ? document.documentElement.dataset.theme : theme
  const src = current === 'dark' ? avatarDark : avatarLight
  return <img src={src} alt={alt} {...props} />
}

export default Avatar
