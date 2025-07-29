import { useTheme } from '../ThemeContext.jsx'
import { useUser } from '../context/AppContext.jsx'
import { useMemo } from 'react'
import { cacheBust } from '../utils.js'
import avatarLight from '../assets/default-user-avatar-light.svg'
import avatarDark from '../assets/default-user-avatar-dark.svg'

// 基于当前主题切换默认头像
function Avatar({ src, alt = 'User Avatar', ...props }) {
  const { resolvedTheme } = useTheme()
  const { user } = useUser()
  const defaultSrc = resolvedTheme === 'dark' ? avatarDark : avatarLight
  const finalSrc = src || user?.avatar || defaultSrc
  const displaySrc = useMemo(() => cacheBust(finalSrc), [finalSrc])
  const style = {
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 0 4px rgb(0 0 0 / 15%)'
  }
  return <img src={displaySrc} alt={alt} style={style} {...props} />
}

export default Avatar
