import { salesService } from '../../../services/salesService'
import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../_ui/TableComponent'
import { Column } from '../../../models/interfaces/Column'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterDate } from '../../_ui/FilterDate'
import { AlertContext } from '../../../contexts/alertContext'
import style from './Sales.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { ISale } from '../../../models/interfaces/ISale'

export function Sales() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [sales, setSales] = useState<ISale[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [saleToEditData, setSaleToEditData] = useState<ISale | null>(null)
  const router = useRouter()

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({ filters: { ...(router.query as any) } }, httpClientProvider)
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

  function handleCancelSale(sale: ISale) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente cancelar esta venda?',
      onClickAgree: () => {
        salesService
          .cancel({ idSale: sale?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
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
              type: ALERT_NOTIFY_TYPE.ERROR,
              text: `Erro ao tentar cancelar a venda (${err?.message})`,
            })
          })
      },
    })
  }

  function handleEditSale(sale: ISale) {
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
            setSaleToEditData(null)
          }}
        />
      )}
    </>
  )
}
