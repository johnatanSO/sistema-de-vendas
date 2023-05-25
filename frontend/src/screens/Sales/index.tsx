import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import style from './Sales.module.scss'
console.log(style)

export function Sales() {
  const [sales, setSales] = useState<any[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({})
      .then((res) => {
        setSales(res.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingSales(false)
      })
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <>
      <HeaderPage buttonText="Nova venda" />
      {loadingSales && <span>carregando vendas...</span>}
      <table>
        <thead>
          <tr>
            <th>Title 1</th>
            <th>Title 2</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale._id}>
                <td>Corpo 1</td>
                <td>Corpo 2</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
