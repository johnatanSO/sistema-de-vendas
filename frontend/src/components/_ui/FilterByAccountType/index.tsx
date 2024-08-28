import { CustomTextField } from '../CustomTextField'
import style from './FilterByAccountType.module.scss'
import { MenuItem } from '@mui/material'
import { useFilterByAccountType } from './hooks/useFilterByAccountType'

export function FilterByAccountType() {
  const { register, errors } = useFilterByAccountType()

  return (
    <form className={style.filterContainer}>
      <CustomTextField
        size="small"
        select
        label="Tipo de conta"
        placeholder="Escolha o tipo da conta"
        className={style.input}
        {...register('accountType')}
        error={!!errors.accountType}
      >
        <MenuItem value={'all'}>Todas</MenuItem>
        <MenuItem value="in">Entrada</MenuItem>
        <MenuItem value="out">Saída</MenuItem>
      </CustomTextField>
    </form>
  )
}
