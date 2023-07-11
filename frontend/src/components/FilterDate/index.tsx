import style from './FilterDate.module.scss'

export function FilterDate() {
  return (
    <div className={style.inputsContainer}>
      <input type="date" />
      <input type="date" />
      <button className={style.filterButton} type="button">
        Filtrar
      </button>
    </div>
  )
}
