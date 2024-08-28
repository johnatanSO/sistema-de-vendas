import { useRouter } from 'next/router'
import { INewAccount, newAccountSchema } from '../interfaces/INewAccount'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { useForm } from 'react-hook-form'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountsService } from '../../../../services/accountsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

type Props = {
  handleClose: () => void
  accountDataToEdit: IAccount | null
}

export function useFormAccount({ handleClose, accountDataToEdit }: Props) {
  const router = useRouter()

  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
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

  async function onCreateNewAccount(newAccountData: INewAccount) {
    await accountsService
      .create({ newAccountData }, httpClientProvider)
      .then(() => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
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

  async function onEditAccount(accountData: INewAccount) {
    await accountsService
      .update(
        { ...accountData, _id: accountData._id || '' },
        httpClientProvider,
      )
      .then(() => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
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

  return {
    onCreateNewAccount,
    onEditAccount,
    handleSubmit,
    isSubmitting,
    register,
    setValue,
    accountType,
    errors,
  }
}
