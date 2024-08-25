import { useContext, useState } from 'react'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { productsService } from '../../../../services/productsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { AlertContext } from '../../../../contexts/alertContext'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

export function useProductsList() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [productsList, setProductsList] = useState<IProduct[]>([])

  function getProducts() {
    productsService
      .getAll({ filters: {} }, httpClientProvider)
      .then(({ data: { items } }) => {
        setProductsList(items)
      })
      .catch((err) => {
        console.error('ERRO AO BUSCAR PRODUTOS: ', err)

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          open: true,
          text: 'Erro ao buscar produtos',
        })
      })
  }

  return {
    getProducts,
    productsList,
  }
}
