import { useState, useEffect } from 'react'
import { CustomTextField } from '../CustomTextField'
import style from './FilterByAccountType.module.scss'
import { useRouter } from 'next/router'
import { MenuItem } from '@mui/material'

export function FilterByAccountType() {
  const [accountType, setAccountType] = useState<'in' | 'out' | 'all'>('all')
  const router = useRouter()

  useEffect(() => {
    if (accountType !== 'all') {
      router.push({
        pathname: router.route,
        query: {
          accountType,
        },
      })
    } else {
      router.push(router.route)
    }
  }, [accountType])

  return (
    <form className={style.filterContainer}>
      <CustomTextField
        size="small"
        select
        label="Tipo de conta"
        placeholder="Escolha o tipo da conta"
        className={style.input}
        value={accountType}
        onChange={(event: any) => {
          setAccountType(event?.target.value)
        }}
      >
        <MenuItem value={'all'}>Todas</MenuItem>
        <MenuItem value="in">Entrada</MenuItem>
        <MenuItem value="out">Saída</MenuItem>
      </CustomTextField>
    </form>
  )
}
