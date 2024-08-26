import { useRouter } from 'next/router'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { accountsService } from '../../../../services/accountsService'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'

export function useDeleteAccount() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  const router = useRouter()

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

  return {
    handleDeleteAccount,
  }
}
