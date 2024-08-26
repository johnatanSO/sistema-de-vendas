import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useState } from 'react'
import { ModalCreateNewAccount } from './ModalCreateNewAccount'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterByAccountType } from '../../_ui/FilterByAccountType'
import { AlertContext } from '../../../contexts/alertContext'
import { accountsService } from '../../../services/accountsService'
import style from './Accounts.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { IAccount } from '../../../models/interfaces/IAccount'
import { useAccountList } from './hooks/useAccountList'

export function Accounts() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [accountDataToEdit, setAccountDataToEdit] = useState<IAccount | null>(
    null,
  )
  const router = useRouter()
  const fieldsMobile = useFieldsMobile()
  const { accounts, loadingAccounts } = useAccountList()
  const columns: IColumn[] = useColumns({
    handleEditAccount,
    handleDeleteAccount,
  })

  function handleDeleteAccount(account: IAccount) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir esta conta?',
      onClickAgree: () => {
        accountsService
          .delete({ idAccount: account?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Conta excluída com sucesso',
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
              text: `Erro ao tentar excluir conta (${err?.message})`,
            })
          })
      },
    })
  }

  function handleEditAccount(account: IAccount) {
    if (!account) return

    setAccountDataToEdit(account)
    setFormModalOpened(true)
  }

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
