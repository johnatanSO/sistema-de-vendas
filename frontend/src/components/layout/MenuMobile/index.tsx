import style from './MenuMobile.module.scss'
import { UserOptions } from '../UserOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MouseEventHandler } from 'react'

interface Props {
  handleOpenMenuOptions: MouseEventHandler<HTMLButtonElement>
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
        <FontAwesomeIcon icon={faBars} className={style.icon} />
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
