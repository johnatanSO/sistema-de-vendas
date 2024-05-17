import { CellFunctionParams } from '../../../../models/columns'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      field: 'phone',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
  ]
}
