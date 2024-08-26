import { IClient } from '../../../../models/interfaces/IClient'
import { CellFunctionParams } from '../../../../models/interfaces/IColumn'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
    {
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
  ]
}
