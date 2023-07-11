import { ReactNode } from 'react'

export interface ValueFormatterParams {
  data: any
  value: any
}

export interface CellRendererParams {
  data: any
  value: any
}

export interface CellClassParams {
  data: any
  value: any
}

export interface Column {
  headerName: string
  field: string
  valueFormatter?: (params: ValueFormatterParams) => any
  cellRenderer?: (params: CellRendererParams) => ReactNode
  cellClass?: (params: CellClassParams) => any
}
