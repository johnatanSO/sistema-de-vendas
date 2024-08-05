import { ReactNode } from 'react'
import style from './HeaderPage.module.scss'
import { Plus } from '@phosphor-icons/react'

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
          <Plus size={32} />
          {buttonText || 'Cadastrar'}
        </button>
      </div>
    </header>
  )
}
