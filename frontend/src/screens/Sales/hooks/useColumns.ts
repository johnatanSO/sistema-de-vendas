import dayjs from 'dayjs'
import { Column, ValueFormatterParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'

export function useColumns(): Column[] {
  return [
    {
      headerName: 'Nº pedido',
      field: '_id',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: ValueFormatterParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value),
    },
  ]
}
