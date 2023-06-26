export interface ValueFormatterParams {
  data: any
  value: any
}

export interface Column {
  headerName: string
  field: string
  valueFormatter: (params: ValueFormatterParams) => any
}
