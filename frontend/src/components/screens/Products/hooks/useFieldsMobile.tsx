import { Product } from '..'
import { CellFunctionParams } from '../../../../models/interfaces/Column'
import { format } from '../../../../utils/format'

export function useFieldsMobile() {
  return [
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        params.value || '--',
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        format.formatarReal(params.value || 0),
    },
  ]
}
