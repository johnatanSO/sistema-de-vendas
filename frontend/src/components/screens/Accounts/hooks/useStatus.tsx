import { ChangeEvent, useContext } from 'react'
import { accountsService } from '../../../../services/accountsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../../contexts/alertContext'
import { CellFunctionParams } from '../../../_ui/TableComponent/interfaces'
import { IAccount } from '../../../../models/interfaces/IAccount'

export function useStatus(params: CellFunctionParams<IAccount>) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()

  function handleChangeStatusAccount(event: ChangeEvent<HTMLInputElement>) {
    const { _id: idAccount } = params.data

    accountsService
      .updateStatus(
        {
          idAccount,
          status: event.target.value,
        },
        httpClientProvider,
      )
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Status da conta alterado com sucesso`,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
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
          text: `Erro ao tentar alterar o status da conta - ${err?.message}`,
          type: ALERT_NOTIFY_TYPE.ERROR,
        })
      })
  }

  return {
    handleChangeStatusAccount,
  }
}
