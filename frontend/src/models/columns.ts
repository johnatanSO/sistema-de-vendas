import { ReactNode } from 'react'

export interface CellFunctionParams {
  data: unknown
  value: unknown
}

export interface Column {
  type?: string
  headerName: string
  field: string
  valueFormatter?: (
    params: CellFunctionParams,
  ) => string | number | null | undefined
  cellRenderer?: (params: CellFunctionParams) => ReactNode
  cellClass?: (params: CellFunctionParams) => any
}
