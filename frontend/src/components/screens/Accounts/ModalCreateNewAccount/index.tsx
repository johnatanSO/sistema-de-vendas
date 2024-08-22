import { ModalLayout } from '../../../_ui/ModalLayout'
import { useContext } from 'react'
import style from './ModalCreateNewAccount.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { accountsService } from '../../../../services/accountsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { INewAccount, newAccountSchema } from '../interfaces/INewAccount'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IAccount } from '../interfaces/IAccount'

interface Props {
  accountDataToEdit: IAccount | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewAccount({
  open,
  handleClose,
  accountDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm<INewAccount>({
    defaultValues: accountDataToEdit || {
      description: '',
      type: ACCOUNT_TYPE.IN,
      category: '',
      value: 0,
    },
    resolver: zodResolver(newAccountSchema),
  })

  const accountType = watch('type')

  const router = useRouter()

  function onCreateNewAccount(newAccountData: INewAccount) {
    accountsService
      .create({ newAccountData }, httpClientProvider)
      .then(() => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Conta cadastrada com sucesso',
        })

        router.push({
          pathname: router.route,
          query: router.query,
        })

        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: 'Erro ao tentar cadastrar conta ' + `(${err?.message})`,
        })
      })
  }

  function onEditAccount(accountData: INewAccount) {
    accountsService
      .update(
        { ...accountData, _id: accountData._id || '' },
        httpClientProvider,
      )
      .then(() => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados da conta atualizados com sucesso',
        })

        router.push({
          pathname: router.route,
          query: router.query,
        })

        handleClose()
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
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        accountDataToEdit ? onEditAccount : onCreateNewAccount,
      )}
      title="Cadastro de conta"
      submitButtonText="Cadastrar"
      loading={isLoading}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Descrição"
          type="text"
          placeholder="Digite uma descrição para a conta"
          {...register('description')}
        />
        <CustomTextField
          size="small"
          label="Categoria"
          type="text"
          placeholder="Digite uma categoria para a conta"
          {...register('category')}
        />

        <div className={style.selectTypeContainer}>
          <button
            type="button"
            style={{ opacity: accountType === ACCOUNT_TYPE.IN ? 1 : 0.5 }}
            disabled={accountType === ACCOUNT_TYPE.IN}
            className={`${style.typeButton} ${style.inButton}`}
            onClick={() => {
              setValue('type', ACCOUNT_TYPE.IN)
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faArrowUp} /> Entrada
          </button>

          <button
            type="button"
            style={{ opacity: accountType === ACCOUNT_TYPE.OUT ? 1 : 0.5 }}
            disabled={accountType === ACCOUNT_TYPE.OUT}
            className={`${style.typeButton} ${style.outButton}`}
            onClick={() => {
              setValue('type', ACCOUNT_TYPE.OUT)
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
          {...register('value', { required: true })}
          error={!!errors.value}
          helperText={errors.value ? errors?.value?.message : ''}
        />
      </div>
    </ModalLayout>
  )
}
