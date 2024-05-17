import style from './FilterDate.module.scss'
import { CustomTextField } from '../CustomTextField'
import { FormEvent, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export function FilterDate() {
  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf('month').toISOString(),
  )
  const [endDate, setEndDate] = useState<string>(
    dayjs().endOf('month').toISOString(),
  )

  const router = useRouter()

  function onFilterByDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    router.push({
      pathname: router.route,
      query: {
        startDate,
        endDate,
      },
    })
  }

  return (
    <form onSubmit={onFilterByDate} className={style.inputsContainer}>
      <CustomTextField
        size="small"
        className={style.input}
        type="date"
        label="Data inicial"
        InputLabelProps={{ shrink: true }}
        value={dayjs(startDate).format('YYYY-MM-DD')}
        onChange={(event) => {
          setStartDate(dayjs(event.target.value).startOf('day').toISOString())
        }}
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
          setEndDate(dayjs(event.target.value).endOf('day').toISOString())
        }}
      />
      <button type="submit" className={style.filterButton}>
        <FontAwesomeIcon className={style.icon} icon={faSearch} />
        Filtrar
      </button>
    </form>
  )
}
