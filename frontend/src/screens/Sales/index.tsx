import { salesService } from '../../services/salesService'
import { HeaderPage } from '../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterDate } from '../../../src/components/FilterDate'
import { AlertContext } from '../../../src/contexts/alertContext'
import style from './Sales.module.scss'
import { ListMobile } from '../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Sale {
  _id: string
  date: Date
  totalValue: number
  client: string
}

export function Sales() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [sales, setSales] = useState<Sale[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [saleToEditData, setSaleToEditData] = useState<any>(undefined)
  const router = useRouter()

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({ filters: { ...router.query } })
      .then((res) => {
        setSales(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR VENDAS, ', err)
      })
      .finally(() => {
        setLoadingSales(false)
      })
  }

  useEffect(() => {
    getSales()
  }, [router.query])

  function handleCancelSale(sale: Sale) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente cancelar esta venda?',
      onClickAgree: () => {
        salesService
          .cancel({ idSale: sale?._id })
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'success',
              text: 'Venda cancelada com sucesso',
            })
            router.push({
              pathname: router.route,
              query: router.query,
            })
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: `Erro ao tentar cancelar a venda (${err.response.data.error})`,
            })
          })
      },
    })
  }

  function handleEditSale(sale: Sale) {
    setSaleToEditData(sale)
    setFormModalOpened(true)
  }

  const columns: Column[] = useColumns({
    handleEditSale,
    handleCancelSale,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
        InputFilter={<FilterDate />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          emptyText="Nenhuma venda encontrada"
          loading={loadingSales}
          columns={columns}
          rows={sales}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          emptyText="Nenhuma venda encontrada"
          loading={loadingSales}
          collapseItems={columns}
          itemFields={fieldsMobile}
          items={sales}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewSale
          open={formModalOpened}
          saleToEditData={saleToEditData}
          handleClose={() => {
            setFormModalOpened(false)
            setSaleToEditData(undefined)
          }}
        />
      )}
    </>
  )
}
