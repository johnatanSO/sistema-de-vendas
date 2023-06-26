import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import style from './Sales.module.scss'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import dayjs from 'dayjs'
import { format } from '../../../src/utils/format'

interface Sale {
  _id: string
  date: Date
  totalValue: number
  client: string
}

export function Sales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({ filters: {} })
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
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
      />
      {loadingSales && <span>carregando vendas...</span>}

      <table className={style.table}>
        <thead>
          <tr>
            <th>Nº do pedido</th>
            <th>Cliente</th>
            <th>Data da venda</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale._id}>
                <td>{sale._id}</td>
                <td>{sale.client || '--'}</td>
                <td>{dayjs(sale.date).format('DD/MM/YYYY - HH:mm')}</td>
                <td>{format.formatarReal(sale.totalValue)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {formModalOpened && (
        <ModalCreateNewSale
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
          }}
        />
      )}
    </>
  )
}
