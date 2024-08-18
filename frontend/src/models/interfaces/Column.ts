import { ReactNode } from 'react'

export interface CellFunctionParams<Data> {
  data: Data
  value: string | number | null | undefined
}

export interface Column {
  type?: string
  headerName: string
  field: string
  valueFormatter?: (
    params: CellFunctionParams<any>,
  ) => string | number | null | undefined
  cellRenderer?: (params: CellFunctionParams<any>) => ReactNode
  cellClass?: (params: CellFunctionParams<any>) => any
}
