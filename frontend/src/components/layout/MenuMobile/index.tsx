import style from './MenuMobile.module.scss'
import { UserOptions } from '../UserOptions'
import { List } from '@phosphor-icons/react'

interface Props {
  handleOpenMenuOptions: (event: any) => void
  menuOptionsOpened: boolean
}

export function MenuMobile({
  handleOpenMenuOptions,
  menuOptionsOpened,
}: Props) {
  return (
    <header className={style.headerMenu}>
      <button
        onClick={handleOpenMenuOptions}
        className={`${style.menuOptionsButton} ${
          menuOptionsOpened && style.menuOpened
        }`}
        type="button"
      >
        <List size={32} />
      </button>

      <UserOptions
        position={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
      />
    </header>
  )
}
