import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import style from '../Accounts.module.scss'

export function useFieldsMobile() {
  return [
    {
      field: 'date',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'value',
      valueFormatter: (params: CellFunctionParams) =>
        format.formatarReal(params.value || 0),
      cellClass: (params: CellFunctionParams) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
  ]
}
