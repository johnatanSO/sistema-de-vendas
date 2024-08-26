import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { ISupplier } from '../../../../models/interfaces/ISupplier'
import { suppliersService } from '../../../../services/suppliersService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

export function useDeleteSupplier() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  const router = useRouter()

  function handleDeleteSupplier(supplier: ISupplier) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este fornecedor?',
      onClickAgree: () => {
        suppliersService
          .delete({ idSupplier: supplier?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Fornecedor excluído com sucesso',
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
              text: `Erro ao tentar excluir fornecedor (${err?.message})`,
            })
          })
      },
    })
  }

  return {
    handleDeleteSupplier,
  }
}
