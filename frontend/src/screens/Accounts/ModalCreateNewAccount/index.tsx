import { ModalLayout } from '../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewAccount.module.scss'
import { CustomTextField } from '../../../components/CustomTextField'
import { accountsService } from '../../../services/accountsService'
import { AlertContext } from '../../../contexts/alertContext'
import { useRouter } from 'next/router'

export interface NewAccountData {
  name: string
  stock: string
  value: string
}

interface Props {
  accountDataToEdit: NewAccountData
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewAccount({
  open,
  handleClose,
  accountDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewAccountValues = {
    name: '',
    stock: '0',
    value: '0',
  }
  const [newAccountData, setNewAccountData] = useState<NewAccountData>(
    accountDataToEdit || defaultNewAccountValues,
  )
  const [loadingCreateNewAccount, setLoadingCreateNewAccount] =
    useState<boolean>(false)
  const router = useRouter()
  function onCreateNewAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newAccountData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
    accountsService
      .create({ newAccountData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewAccountData(defaultNewAccountValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Conta cadastrada com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar conta ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewAccount(false)
      })
  }

  function onEditAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newAccountData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
    accountsService
      .update({ accountData: newAccountData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewAccountData(defaultNewAccountValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados da conta atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados da conta ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewAccount(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={accountDataToEdit ? onEditAccount : onCreateNewAccount}
      title="Cadastro de conta"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewAccount}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          value={newAccountData?.name}
          onChange={(event) => {
            setNewAccountData({
              ...newAccountData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="Quantidade"
          type="number"
          placeholder="Digite a quantidade"
          value={newAccountData?.stock}
          onChange={(event) => {
            setNewAccountData({
              ...newAccountData,
              stock: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="Valor"
          type="number"
          placeholder="Digite o valor"
          value={newAccountData?.value}
          onChange={(event) => {
            setNewAccountData({
              ...newAccountData,
              value: event.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
