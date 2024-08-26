import { ReactNode } from 'react'

export interface CellFunctionParams<Data> {
  data: Data
  value: any
}

export interface IColumn {
  type?: string
  headerName: string
  field: string
  valueFormatter?: (
    params: CellFunctionParams<any>,
  ) => string | number | null | undefined
  cellRenderer?: (params: CellFunctionParams<any>) => ReactNode
  cellClass?: (params: CellFunctionParams<any>) => any
}
