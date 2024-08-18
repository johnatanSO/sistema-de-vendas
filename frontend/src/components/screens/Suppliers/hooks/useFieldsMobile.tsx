import { Supplier } from '..'
import { CellFunctionParams } from '../../../../models/interfaces/Column'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
    {
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
  ]
}
