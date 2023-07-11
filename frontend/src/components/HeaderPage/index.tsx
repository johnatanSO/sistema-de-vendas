import { FilterDate } from '../FilterDate'
import style from './HeaderPage.module.scss'

interface HeaderPageProps {
  buttonText: string
  onClickFunction: () => void
}

export function HeaderPage({ buttonText, onClickFunction }: HeaderPageProps) {
  return (
    <header className={style.headerContainer}>
      <FilterDate />
      <div className={style.buttonsContainer}>
        <button className={style.createNewButton} onClick={onClickFunction}>
          {buttonText || 'Cadastrar'}
        </button>
        <button className={style.filtersButton}>Filtros</button>
      </div>
    </header>
  )
}
