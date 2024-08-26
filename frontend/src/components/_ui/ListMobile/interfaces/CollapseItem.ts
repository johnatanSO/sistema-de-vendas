import { ReactNode } from 'react'
import { CollapseFunctionParams } from './Functions'

export interface CollapseItem {
  headerName: string
  field: string
  valueFormatter?: (params: CollapseFunctionParams) => any
  cellRenderer?: (params: CollapseFunctionParams) => ReactNode
  cellClass?: (params: CollapseFunctionParams) => string
  type?: string
}
