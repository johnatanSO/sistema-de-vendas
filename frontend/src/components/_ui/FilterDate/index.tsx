import style from './FilterDate.module.scss'
import { CustomTextField } from '../CustomTextField'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useFilterDate } from './hooks/useFilterDate'

export function FilterDate() {
  const { errors, handleSubmit, onFilterByDate, setValue, endDate, startDate } =
    useFilterDate()

  return (
    <form
      onSubmit={handleSubmit(onFilterByDate)}
      className={style.inputsContainer}
    >
      <CustomTextField
        size="small"
        className={style.input}
        type="date"
        label="Data inicial"
        InputLabelProps={{ shrink: true }}
        value={dayjs(startDate).format('YYYY-MM-DD')}
        onChange={(event) => {
          setValue(
            'startDate',
            dayjs(event.target.value).startOf('day').toISOString(),
          )
        }}
        error={!!errors.startDate}
      />
      <CustomTextField
        size="small"
        className={style.input}
        type="date"
        label="Data final"
        sx={{
          svg: { color: '#fff' },
          input: { color: '#fff' },
        }}
        InputLabelProps={{ shrink: true }}
        value={dayjs(endDate).format('YYYY-MM-DD')}
        onChange={(event) => {
          setValue(
            'endDate',
            dayjs(event.target.value).endOf('day').toISOString(),
          )
        }}
        error={!!errors.endDate}
      />
      <button type="submit" className={style.filterButton}>
        <FontAwesomeIcon className={style.icon} icon={faSearch} />
        Filtrar
      </button>
    </form>
  )
}
