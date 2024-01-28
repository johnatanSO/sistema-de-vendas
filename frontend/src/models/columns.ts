import { ReactNode } from 'react'

export interface CellFunctionParams {
  data: any
  value: any
}

export interface Column {
  type?: string
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams) => any
  cellRenderer?: (params: CellFunctionParams) => ReactNode
  cellClass?: (params: CellFunctionParams) => any
}
