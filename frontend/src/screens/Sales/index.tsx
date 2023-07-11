import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'

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

  const columns: Column[] = useColumns()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
      />

      <TableComponent loading={loadingSales} columns={columns} rows={sales} />

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
