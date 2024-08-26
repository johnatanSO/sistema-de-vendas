import { HeaderPage } from '../../_ui/HeaderPage'
import { ModalCreateNewClient } from './ModalCreateNewClient'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import style from './Clients.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { FilterByName } from '../../_ui/FilterByName'
import { useClientList } from '../../../hooks/useClientList'
import { useDeleteClient } from './hooks/useDeleteClient'
import { useEditClient } from './hooks/useEditClient'

export function Clients() {
  const { handleDeleteClient } = useDeleteClient()

  const {
    clientDataToEdit,
    formModalOpened,
    handleEditClient,
    setClientDataToEdit,
    setFormModalOpened,
  } = useEditClient()

  const columns: IColumn[] = useColumns({
    handleEditClient,
    handleDeleteClient,
  })

  const fieldsMobile = useFieldsMobile()

  const { clients, loadingClients } = useClientList()

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
