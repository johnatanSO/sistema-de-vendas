import { ReactNode } from 'react'

export interface CellFunctionParams {
  data: any
  value: any
}

export interface Column {
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams) => any
  cellRenderer?: (params: CellFunctionParams) => ReactNode
  cellClass?: (params: CellFunctionParams) => any
}
