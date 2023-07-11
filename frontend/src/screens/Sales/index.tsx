import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterDate } from '../../../src/components/FilterDate'

export interface Sale {
  _id: string
  date: Date
  totalValue: number
  client: string
}

export function Sales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const router = useRouter()

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({ filters: { ...router.query } })
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
  }, [router.query])

  function handleDeleteSale(sale: Sale) {
    console.log('DELETE')
  }

  function handleEditSale(sale: Sale) {
    console.log('EDIT')
  }

  const columns: Column[] = useColumns({
    handleEditSale,
    handleDeleteSale,
  })

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
        InputFilter={<FilterDate />}
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
