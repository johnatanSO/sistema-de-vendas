import { styled } from '@mui/system'
import {
  inputLabelClasses,
  MenuItem,
  outlinedInputClasses,
  TextField,
} from '@mui/material'
import { CellFunctionParams } from '../../../../models/interfaces/Column'
import style from '../Accounts.module.scss'
import { accountsService } from '../../../../services/accountsService'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { Account } from '../interfaces/IAccount.js'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

const CustomSelect = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderRadius: '10px',
    borderColor: 'transparent',
    color: '#ffffff',
  },
  [`& .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda do input quando tem um erro
    borderRadius: '0.7rem',
    border: 'transparent',
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda com hover
      borderColor: 'transparent',
    },
  [`&:hover .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda com hover
    borderColor: '#ff2222',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda do input quando estiver em foco.
      // borderColor: '#ff6600',
    },
  [`& .${outlinedInputClasses.input} `]: {
    // Style do valor dentro do input quando sair do foco
    color: '#ffffff',
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    // Style do valor com hover.
    color: '#ffffff',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      // Style do placeholder quando estiver em foco
      color: '#ffffff',
    },
  [`& .${inputLabelClasses.outlined}`]: {
    // Style da label
    color: '#ffffff',
  },
  [`& .Mui-error`]: {
    // Cor do text do error
    color: '#ff4646',
  },
  [`& .Mui-error .MuiSelect-icon`]: {
    // Style do icone quadno tem um erro
    color: '#ff4646',
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    // Style da label em foco
    color: '#ff6600',
  },
})

type Props = {
  params: CellFunctionParams<Account>
}

export function ChangeStatusAccount({ params }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()

  function handleChangeStatusAccount(event: any) {
    const { _id: idAccount } = params.data

    accountsService
      .updateStatus(
        {
          idAccount,
          status: event.target.value,
        },
        httpClientProvider,
      )
      .then((res) => {
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
