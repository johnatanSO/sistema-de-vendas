import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useState } from 'react'
import { ModalCreateNewClient } from './ModalCreateNewClient'
import { TableComponent } from '../../_ui/TableComponent'
import { Column } from '../../../models/interfaces/Column'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import style from './Clients.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { clientsService } from '../../../services/clientsService'
import { FilterByName } from '../../_ui/FilterByName'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { IClient } from '../../../models/interfaces/IClient'
import { useClientList } from '../../../hooks/useClientList'

export function Clients() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [clientDataToEdit, setClientDataToEdit] = useState<IClient | null>(null)

  const router = useRouter()

  const columns: Column[] = useColumns({
    handleEditClient,
    handleDeleteClient,
  })

  const fieldsMobile = useFieldsMobile()

  const { clients, loadingClients } = useClientList()

  function handleDeleteClient(client: IClient) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este cliente?',
      onClickAgree: () => {
        clientsService
          .delete({ idClient: client?._id || '' }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Cliente excluído com sucesso',
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
              text: `Erro ao tentar excluir cliente (${err?.message})`,
            })
          })
      },
    })
  }

  function handleEditClient(client: IClient) {
    setClientDataToEdit(client)
    setFormModalOpened(true)
  }

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo cliente"
        InputFilter={<FilterByName />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingClients}
          columns={columns}
          rows={clients}
          emptyText="Nenhum cliente encontrado"
          heightSkeleton={40}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          loading={loadingClients}
          items={clients}
          emptyText="Nenhum cliente encontrado"
          collapseItems={columns}
          itemFields={fieldsMobile}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewClient
          clientDataToEdit={clientDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setClientDataToEdit(null)
          }}
        />
      )}
    </>
  )
}
