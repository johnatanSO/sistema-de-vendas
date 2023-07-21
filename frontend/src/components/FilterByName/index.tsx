import { FormEvent, useState } from 'react'
import { CustomTextField } from '../CustomTextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import style from './FilterByName.module.scss'
import { useRouter } from 'next/router'

export function FilterByName() {
  const [searchString, setSearchString] = useState<string>('')
  const router = useRouter()

  function onFilterByName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (searchString) {
      router.push({
        pathname: router.route,
        query: {
          searchString,
        },
      })
    } else {
      router.push(router.route)
    }
  }

  return (
    <form className={style.filterContainer} onSubmit={onFilterByName}>
      <CustomTextField
        size="small"
        type="text"
        label="Nome"
        placeholder="Digite o nome"
        className={style.input}
        value={searchString}
        onChange={(event) => {
          setSearchString(event?.target.value)
        }}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} style={{ height: '1rem' }} />
        Filtrar
      </button>
    </form>
  )
}
