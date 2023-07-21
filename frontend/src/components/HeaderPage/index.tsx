import { ReactNode } from 'react'
import style from './HeaderPage.module.scss'

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
      {InputFilter && InputFilter}
      <div className={style.buttonsContainer}>
        <button className={style.createNewButton} onClick={onClickFunction}>
          {buttonText || 'Cadastrar'}
        </button>
        <button disabled className={style.filtersButton}>
          Filtros
        </button>
      </div>
    </header>
  )
}
