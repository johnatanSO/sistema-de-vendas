import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'

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
    },
  ]
}
