import { Column, ValueFormatterParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'

export function useColumns(): Column[] {
  return [
    {
      headerName: 'Código',
      field: '_id',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Quantidade',
      field: 'stock',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value),
    },
  ]
}
