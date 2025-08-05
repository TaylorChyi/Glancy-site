import { useLanguage } from '@/context'
import ThemeIcon from '@/components/ui/Icon'
import { UserMenu } from '@/components/Header'

function Brand() {
  const { lang } = useLanguage()
  const text = lang === 'zh' ? '格律词典' : 'Glancy'

  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div className="sidebar-brand">
      <div className="brand-main" onClick={handleClick}>
        <ThemeIcon name="glancy-web" alt="Glancy" />
        <span>{text}</span>
      </div>
      <div className="mobile-user-menu">
        <UserMenu size={28} />
      </div>
    </div>
  )
}

export default Brand
