import { useTheme } from '../ThemeContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'
import lightIcon from '../assets/glancy-web-light.svg'
import darkIcon from '../assets/glancy-web-dark.svg'
import TopBarActions from './TopBarActions.jsx'
import common from './TopBarCommon.module.css'
import styles from './MobileTopBar.module.css'

function MobileTopBar({
  term = '',
  showBack = false,
  onBack,
  favorited = false,
  onToggleFavorite,
  canFavorite = false,
  onOpenSidebar
}) {
  const { resolvedTheme } = useTheme()
  const { lang } = useLanguage()
  const icon = resolvedTheme === 'dark' ? darkIcon : lightIcon

  return (
    <>
      <button className={styles.topbarBtn} onClick={onOpenSidebar}>
        <img src={icon} alt="brand" width={24} height={24} />
      </button>
      <button
        type="button"
        className={common.backBtn}
        onClick={onBack}
        style={{
          visibility: showBack ? 'visible' : 'hidden',
          pointerEvents: showBack ? 'auto' : 'none'
        }}
      >
        ←
      </button>
      <div className={common.termText}>{term || (lang === 'zh' ? '格律词典' : 'Glancy')}</div>
      <TopBarActions
        favorited={favorited}
        onToggleFavorite={onToggleFavorite}
        canFavorite={canFavorite}
      />
    </>
  )
}

export default MobileTopBar
