import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../models/interfaces/IColumn'
import { format } from '../../../../utils/format'
import style from '../Accounts.module.scss'
import { IAccount } from '../../../../models/interfaces/IAccount'

export function useFieldsMobile() {
  return [
    {
      field: 'date',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'value',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        format.formatarReal(params.value || 0),
      cellClass: (params: CellFunctionParams<IAccount>) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
  ]
}
