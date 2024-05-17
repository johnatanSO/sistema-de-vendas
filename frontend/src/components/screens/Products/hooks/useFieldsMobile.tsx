import { CellFunctionParams } from '../../../../models/columns'
import { format } from '../../../../utils/format'

export function useFieldsMobile() {
  return [
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams) =>
        format.formatarReal(params.value || 0),
    },
  ]
}
