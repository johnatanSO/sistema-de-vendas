import { ModalLayout } from '../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewAccount.module.scss'
import { CustomTextField } from '../../../components/CustomTextField'
import { accountsService } from '../../../services/accountsService'
import { AlertContext } from '../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export interface NewAccountData {
  description: string
  type: string
  category: string
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
    description: '',
    type: 'in',
    category: '',
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
          label="Descrição"
          type="text"
          placeholder="Digite uma descrição para a conta"
          value={newAccountData?.description}
          onChange={(event) => {
            setNewAccountData({
              ...newAccountData,
              description: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="Categoria"
          type="text"
          placeholder="Digite uma categoria para a conta"
          value={newAccountData?.category}
          onChange={(event) => {
            setNewAccountData({
              ...newAccountData,
              category: event.target.value,
            })
          }}
        />

        <div className={style.selectTypeContainer}>
          <button
            type="button"
            style={{ opacity: newAccountData?.type === 'in' ? 1 : 0.5 }}
            disabled={newAccountData?.type === 'in'}
            className={`${style.typeButton} ${style.inButton}`}
            onClick={() => {
              setNewAccountData({
                ...newAccountData,
                type: 'in',
              })
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faAngleUp} /> Entrada
          </button>
          <button
            type="button"
            style={{ opacity: newAccountData?.type === 'out' ? 1 : 0.5 }}
            disabled={newAccountData?.type === 'out'}
            className={`${style.typeButton} ${style.outButton}`}
            onClick={() => {
              setNewAccountData({
                ...newAccountData,
                type: 'out',
              })
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faAngleDown} /> Saída
          </button>
        </div>

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
