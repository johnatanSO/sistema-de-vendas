import style from './TableComponent.module.scss'

interface Props {
  columns: any[]
  rows: any[]
  loading: boolean
}

export function TableComponent({ columns, rows, loading }: Props) {
  return (
    <table style={loading ? { opacity: 0.5 } : {}} className={style.table}>
      <thead>
        <tr>
          {columns?.map((column) => {
            return <th key={column.field}>{column?.headerName || ''}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => {
          return (
            <tr key={row._id}>
              {columns.map((column) => {
                return (
                  <td
                    className={column?.cellClass?.({
                      value: row[column.field],
                      data: row,
                    })}
                    key={column.field}
                  >
                    {column?.valueFormatter?.({
                      value: row[column.field],
                      data: row,
                    })}
                    {column?.cellRenderer?.({
                      value: row[column.field],
                      data: row,
                    })}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
