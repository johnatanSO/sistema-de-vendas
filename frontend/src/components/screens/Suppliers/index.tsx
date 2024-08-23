import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewSupplier } from './ModalCreateNewSupplier'
import { TableComponent } from '../../_ui/TableComponent'
import { Column } from '../../../models/interfaces/Column'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import style from './Suppliers.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { FilterByName } from '../../_ui/FilterByName'
import { suppliersService } from '../../../services/suppliersService'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { ISupplier } from '../../../models/interfaces/ISupplier'

export function Suppliers() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])
  const [loadingSuppliers, setLoadingSuppliers] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [supplierDataToEdit, setSupplierDataToEdit] =
    useState<ISupplier | null>(null)

  const router = useRouter()

  function getSuppliers() {
    setLoadingSuppliers(true)
    suppliersService
      .getAll(httpClientProvider)
      .then((res) => {
        setSuppliers(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR FORNECEDORES, ', err)
      })
      .finally(() => {
        setLoadingSuppliers(false)
      })
  }

  useEffect(() => {
    getSuppliers()
  }, [router.query])

  function handleDeleteSupplier(supplier: ISupplier) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este fornecedor?',
      onClickAgree: () => {
        suppliersService
          .delete({ idSupplier: supplier?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Fornecedor excluído com sucesso',
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
              text: `Erro ao tentar excluir fornecedor (${err?.message})`,
            })
          })
      },
    })
  }

  function handleEditSupplier(supplier: ISupplier) {
    setSupplierDataToEdit(supplier)
    setFormModalOpened(true)
  }

  const columns: Column[] = useColumns({
    handleEditSupplier,
    handleDeleteSupplier,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo fornecedor"
        InputFilter={<FilterByName />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingSuppliers}
          columns={columns}
          rows={suppliers}
          emptyText="Nenhum fornecedor encontrado"
          heightSkeleton={40}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          loading={loadingSuppliers}
          items={suppliers}
          emptyText="Nenhum fornecedor encontrado"
          collapseItems={columns}
          itemFields={fieldsMobile}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewSupplier
          supplierDataToEdit={supplierDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setSupplierDataToEdit(null)
          }}
        />
      )}
    </>
  )
}
