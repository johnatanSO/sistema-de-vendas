import { ReactNode } from 'react'
import style from './HeaderPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface HeaderPageProps {
  buttonText: string
  onClickFunction: () => void
  InputFilter?: ReactNode
}

export function HeaderPage({
  buttonText,
  onClickFunction,
  InputFilter = <></>,
}: HeaderPageProps) {
  return (
    <header className={style.headerContainer}>
      <div className={style.filters}>{InputFilter && InputFilter}</div>
      <div className={style.buttonsContainer}>
        <button className={style.createNewButton} onClick={onClickFunction}>
          <FontAwesomeIcon className={style.icon} icon={faPlus} />
          {buttonText || 'Cadastrar'}
        </button>
      </div>
    </header>
  )
}
