import { FilterDate } from '../FilterDate'
import style from './HeaderPage.module.scss'

interface HeaderPageProps {
  buttonText: string
}

export function HeaderPage({ buttonText }: HeaderPageProps) {
  return (
    <header className={style.headerContainer}>
      <FilterDate />
      <div className={style.buttonsContainer}>
        <button>{buttonText || 'Cadastrar'}</button>
        <button>Filtros</button>
      </div>
    </header>
  )
}
