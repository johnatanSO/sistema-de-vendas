import { HeaderPage } from '../../_ui/HeaderPage'
import { ModalCreateNewAccount } from './ModalCreateNewAccount'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import { FilterByAccountType } from '../../_ui/FilterByAccountType'
import style from './Accounts.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useAccountList } from '../../../hooks/useAccountList'
import { useDeleteAccount } from './hooks/useDeleteAccount'
import { useEditAccount } from './hooks/useEditAccount'

export function Accounts() {
  const fieldsMobile = useFieldsMobile()
  const { accounts, loadingAccounts } = useAccountList({ otherFilters: null })
  const { handleDeleteAccount } = useDeleteAccount()
  const {
    handleEditAccount,
    accountDataToEdit,
    formModalOpened,
    setFormModalOpened,
    setAccountDataToEdit,
  } = useEditAccount()

  const columns: IColumn[] = useColumns({
    handleEditAccount,
    handleDeleteAccount,
  })

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova conta"
        InputFilter={<FilterByAccountType />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingAccounts}
          columns={columns}
          rows={accounts}
          emptyText="Nenhuma conta encontrada"
          heightSkeleton={40}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          loading={loadingAccounts}
          items={accounts}
          emptyText="Nenhuma conta encontrada"
          collapseItems={columns}
          itemFields={fieldsMobile}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewAccount
          accountDataToEdit={accountDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setAccountDataToEdit(null)
          }}
        />
      )}
    </>
  )
}
