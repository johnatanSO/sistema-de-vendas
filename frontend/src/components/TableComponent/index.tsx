import style from './TableComponent.module.scss'

interface Props {
  columns: any[]
  rows: any[]
}

export function TableComponent({ columns, rows }: Props) {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          {columns?.map((column) => {
            return <th key={column.field}>{column?.headerName || '--'}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => {
          return (
            <tr key={row._id}>
              {columns.map((column) => {
                return (
                  <td key={column.field}>
                    {column.valueFormatter(row[column.field])}
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
