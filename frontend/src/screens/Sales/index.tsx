import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column, ValueFormatterParams } from '../../../src/models/columns'
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

  const columns: Column[] = [
    {
      headerName: 'Nº pedido',
      field: '_id',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: ValueFormatterParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value),
    },
  ]

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
      />
      {loadingSales && <span>carregando vendas...</span>}

      <TableComponent columns={columns} rows={sales} />

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
