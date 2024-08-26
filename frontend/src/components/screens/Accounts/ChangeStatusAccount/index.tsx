import { CellFunctionParams } from '../../../../models/interfaces/IColumn'
import style from '../Accounts.module.scss'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { CustomSelect } from './CustomSelect'
import { MenuItem } from '@mui/material'
import { useStatus } from '../hooks/useStatus'

type Props = {
  params: CellFunctionParams<IAccount>
}

export function ChangeStatusAccount({ params }: Props) {
  const { handleChangeStatusAccount } = useStatus(params)

  return (
    <CustomSelect
      className={style[params.value || '']}
      size="small"
      fullWidth
      select
      value={params.value}
      onChange={handleChangeStatusAccount}
    >
      <MenuItem value="paid">Pago</MenuItem>
      <MenuItem value="overdue">Vencida</MenuItem>
      <MenuItem value="pending">Pendente</MenuItem>
    </CustomSelect>
  )
}
