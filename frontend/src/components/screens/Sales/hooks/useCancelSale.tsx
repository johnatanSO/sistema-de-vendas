import { useRouter } from 'next/router'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { ISale } from '../../../../models/interfaces/ISale'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { salesService } from '../../../../services/salesService'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'

export function useCancelSale() {
  const router = useRouter()

  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  function handleCancelSale(sale: ISale) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente cancelar esta venda?',
      onClickAgree: () => {
        salesService
          .cancel({ idSale: sale?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Venda cancelada com sucesso',
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
              text: `Erro ao tentar cancelar a venda (${err?.message})`,
            })
          })
      },
    })
  }

  return {
    handleCancelSale,
  }
}
