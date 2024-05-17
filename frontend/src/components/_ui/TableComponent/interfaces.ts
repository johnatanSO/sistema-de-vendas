import { ReactNode } from 'react'

export interface CellFunctionParams<DataModel> {
  data: DataModel
  value: any
}

export interface Column {
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams<any>) => any
  cellRenderer?: (params: CellFunctionParams<any>) => ReactNode
  cellClass?: (params: CellFunctionParams<any>) => string
  flex?: number | string
}
