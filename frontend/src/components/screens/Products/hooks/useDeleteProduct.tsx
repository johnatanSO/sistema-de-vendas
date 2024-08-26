import { useRouter } from 'next/router'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { productsService } from '../../../../services/productsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useContext } from 'react'

export function useDeleteProduct() {
  const router = useRouter()

  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  function handleDeleteProduct(product: IProduct) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este produto?',
      onClickAgree: () => {
        productsService
          .delete({ idProduct: product?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
              text: 'Produto excluído com sucesso',
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
              text: `Erro ao tentar excluir produto - ${err?.message}`,
            })
          })
      },
    })
  }
  return {
    handleDeleteProduct,
  }
}
