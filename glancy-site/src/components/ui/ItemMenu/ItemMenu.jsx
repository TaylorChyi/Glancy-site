import ThemeIcon from '@/components/ui/Icon'
import useOutsideToggle from '@/hooks/useOutsideToggle.js'
import styles from './ItemMenu.module.css'

function ItemMenu({ onFavorite, onDelete, favoriteLabel, deleteLabel }) {
  const { open, setOpen, ref } = useOutsideToggle(false)

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.action}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
      >
        <ThemeIcon name="ellipsis-vertical" width={16} height={16} />
      </button>
      {open && (
        <div className={styles.menu}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onFavorite()
              setOpen(false)
            }}
          >
            <ThemeIcon
              name="star-solid"
              width={16}
              height={16}
              className={styles.icon}
            />{' '}
            {favoriteLabel}
          </button>
          <button
            type="button"
            className={styles.delete-btn}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
              setOpen(false)
            }}
          >
            <ThemeIcon
              name="trash"
              width={16}
              height={16}
              className={styles.icon}
            />{' '}
            {deleteLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export default ItemMenu
