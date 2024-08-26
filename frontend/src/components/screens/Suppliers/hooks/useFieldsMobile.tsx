import { ISupplier } from '../../../../models/interfaces/ISupplier'
import { CellFunctionParams } from '../../../../models/interfaces/IColumn'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
    {
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
  ]
}
