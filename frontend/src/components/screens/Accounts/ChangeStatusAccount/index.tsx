import { CellFunctionParams } from '../../../../models/interfaces/IColumn'
import style from '../Accounts.module.scss'
import { accountsService } from '../../../../services/accountsService'
import { ChangeEvent, useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { CustomSelect } from './CustomSelect'
import { MenuItem } from '@mui/material'

type Props = {
  params: CellFunctionParams<IAccount>
}

export function ChangeStatusAccount({ params }: Props) {
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

  return (
    <CustomSelect
      className={style[params.value || '']}
      size="small"
      fullWidth
      select
      value={params.value}
      onChange={handleChangeStatusAccount}
    >
      <MenuItem value="paid">Pago</MenuItem>
      <MenuItem value="overdue">Vencida</MenuItem>
      <MenuItem value="pending">Pendente</MenuItem>
    </CustomSelect>
  )
}
