import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewAccount } from './ModalCreateNewAccount'
import { TableComponent } from '../../_ui/TableComponent'
import { Column } from '../../../models/interfaces/Column'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterByAccountType } from '../../_ui/FilterByAccountType'
import { AlertContext } from '../../../contexts/alertContext'
import { accountsService } from '../../../services/accountsService'
import style from './Accounts.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { httpClientProvider } from '../../../providers/HttpClientProvider'

export interface Account {
  _id: string
  description: string
  type: 'in' | 'out'
  value: number
  status: string
}

export function Accounts() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [accountDataToEdit, setAccountDataToEdit] = useState<any>(undefined)
  const router = useRouter()

  function getAccounts() {
    setLoadingAccounts(true)
    accountsService
      .getAll({ filters: { ...router.query } }, httpClientProvider)
      .then((res) => {
        setAccounts(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR CONTAS, ', err)
      })
      .finally(() => {
        setLoadingAccounts(false)
      })
  }

  useEffect(() => {
    getAccounts()
  }, [router.query])

  function handleDeleteAccount(account: Account) {
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
              type: 'success',
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
              type: 'error',
              text: `Erro ao tentar excluir conta (${err?.message})`,
            })
          })
      },
    })
  }

  function handleEditAccount(account: Account) {
    setAccountDataToEdit(account)
    setFormModalOpened(true)
  }

  const columns: Column[] = useColumns({
    handleEditAccount,
    handleDeleteAccount,
  })

  const fieldsMobile = useFieldsMobile()

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
            setAccountDataToEdit(undefined)
          }}
        />
      )}
    </>
  )
}
