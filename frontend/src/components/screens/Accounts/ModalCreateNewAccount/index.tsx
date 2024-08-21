import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewAccount.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { accountsService } from '../../../../services/accountsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { INewAccount } from '../interfaces/INewAccount'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

interface Props {
  accountDataToEdit: INewAccount | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewAccount({
  open,
  handleClose,
  accountDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewAccountValues: INewAccount = {
    description: '',
    type: ACCOUNT_TYPE.IN,
    category: '',
    value: 0,
  }
  const [newAccountData, setNewAccountData] = useState<INewAccount>(
    accountDataToEdit || defaultNewAccountValues,
  )
  const [loadingCreateNewAccount, setLoadingCreateNewAccount] =
    useState<boolean>(false)
  const router = useRouter()
  function onCreateNewAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    accountsService
      .create({ newAccountData }, httpClientProvider)
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
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: 'Erro ao tentar cadastrar conta ' + `(${err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewAccount(false)
      })
  }

  function onEditAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    accountsService
      .update({ accountData: newAccountData }, httpClientProvider)
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
          type: ALERT_NOTIFY_TYPE.ERROR,
          text:
            'Erro ao tentar atualizar dados da conta ' + `(${err?.message})`,
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
      customStyle={{ width: '500px' }}
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
                type: ACCOUNT_TYPE.IN,
              })
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faArrowUp} /> Entrada
          </button>
          <button
            type="button"
            style={{ opacity: newAccountData?.type === 'out' ? 1 : 0.5 }}
            disabled={newAccountData?.type === 'out'}
            className={`${style.typeButton} ${style.outButton}`}
            onClick={() => {
              setNewAccountData({
                ...newAccountData,
                type: ACCOUNT_TYPE.OUT,
              })
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faArrowDown} /> Saída
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
