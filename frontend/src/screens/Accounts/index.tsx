import { HeaderPage } from '../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewAccount } from './ModalCreateNewAccount'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { FilterByAccountType } from '../../components/FilterByAccountType'
import { AlertContext } from '../../../src/contexts/alertContext'
import { accountsService } from '../../services/accountsService'

export interface Account {
  _id: string
  description: string
  type: 'in' | 'out'
  value: number
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
      .getAll({ filters: { ...router.query } })
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
          .delete({ idAccount: account?._id })
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'success',
              text: 'Conta excluído com sucesso',
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
              text: `Erro ao tentar excluir conta (${err.response.data.error})`,
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

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova conta"
        InputFilter={<FilterByAccountType />}
      />

      {accounts?.length > 0 && (
        <TableComponent
          loading={loadingAccounts}
          columns={columns}
          rows={accounts}
        />
      )}

      {accounts?.length === 0 && !loadingAccounts && (
        <EmptyItems text="Nenhuma conta foi encontrada" />
      )}

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
