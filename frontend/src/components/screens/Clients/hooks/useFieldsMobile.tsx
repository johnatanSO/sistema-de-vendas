import { Client } from '..'
import { CellFunctionParams } from '../../../../models/columns'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
    {
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
  ]
}
