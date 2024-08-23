import { useContext, useState } from 'react'
import { IClient } from '../../../../models/interfaces/IClient'
import { clientsService } from '../../../../services/clientsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { AlertContext } from '../../../../contexts/alertContext'

export function useClientsList() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [clientsList, setClientsList] = useState<IClient[]>([])

  function getClientsList() {
    clientsService
      .getAll(httpClientProvider)
      .then(({ data: { items } }) => {
        setClientsList(items)
      })
      .catch((err) => {
        console.error(err)

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          open: true,
          text: 'Erro ao buscar clientes',
        })
      })
  }

  return {
    getClientsList,
    clientsList,
  }
}
