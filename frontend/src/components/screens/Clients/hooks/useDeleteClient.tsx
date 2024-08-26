import { useRouter } from 'next/router'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { IClient } from '../../../../models/interfaces/IClient'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { clientsService } from '../../../../services/clientsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useContext } from 'react'

export function useDeleteClient() {
  const router = useRouter()

  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  function handleDeleteClient(client: IClient) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este cliente?',
      onClickAgree: () => {
        clientsService
          .delete({ idClient: client?._id || '' }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Cliente excluído com sucesso',
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
              text: `Erro ao tentar excluir cliente (${err?.message})`,
            })
          })
      },
    })
  }
  return {
    handleDeleteClient,
  }
}
