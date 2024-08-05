import { ReactNode } from 'react'

export interface CellFunctionParams {
  data: unknown
  value: unknown
}

export interface Column {
  type?: string
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams) => any
  cellRenderer?: (params: CellFunctionParams) => ReactNode
  cellClass?: (params: CellFunctionParams) => any
}
