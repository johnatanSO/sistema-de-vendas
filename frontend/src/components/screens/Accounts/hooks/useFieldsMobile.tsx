import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../models/interfaces/Column.js'
import { format } from '../../../../utils/format'
import style from '../Accounts.module.scss'
import { Account } from '../interfaces/IAccount.js'

export function useFieldsMobile() {
  return [
    {
      field: 'date',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'value',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        format.formatarReal(params.value || 0),
      cellClass: (params: CellFunctionParams<Account>) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
  ]
}
