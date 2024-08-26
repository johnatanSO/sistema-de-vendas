import { ReactNode, createContext, useState } from 'react'
import { AlertDialogConfirm } from '../components/_ui/AlertDialogConfirm'
import { AlertNotify } from '../components/_ui/AlertNotify'
import { ALERT_NOTIFY_TYPE } from '../models/enums/AlertNotifyType'
import { IAlertDialogConfirm } from '../models/interfaces/IAlertDialogConfirm'
import { IAlertNotify } from '../models/interfaces/IAlertNotify'

interface Props {
  children: ReactNode
}

interface IAlertContext {
  alertDialogConfirmConfigs: IAlertDialogConfirm
  setAlertDialogConfirmConfigs: (configs: IAlertDialogConfirm) => void
  alertNotifyConfigs: IAlertNotify
  setAlertNotifyConfigs: (configs: IAlertNotify) => void
}

export const AlertContext = createContext({} as IAlertContext)

export function AlertContextComponent({ children }: Props) {
  const [alertDialogConfirmConfigs, setAlertDialogConfirmConfigs] =
    useState<IAlertDialogConfirm>({
      open: false,
      title: '',
      text: '',
      handleClose: onCloseAlertDialogConfirm,
      onClickAgree: () => undefined,
    })

  const [alertNotifyConfigs, setAlertNotifyConfigs] = useState<IAlertNotify>({
    open: false,
    text: '',
    type: ALERT_NOTIFY_TYPE.SUCCESS,
    handleClose: onCloseNotify,
  })

  function onCloseNotify() {
    setAlertNotifyConfigs({
      ...alertNotifyConfigs,
      open: false,
      text: '',
      type: ALERT_NOTIFY_TYPE.SUCCESS,
    })
  }

  function onCloseAlertDialogConfirm() {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: false,
      title: '',
      text: '',
      onClickAgree: () => undefined,
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alertDialogConfirmConfigs,
        setAlertDialogConfirmConfigs,
        alertNotifyConfigs,
        setAlertNotifyConfigs,
      }}
    >
      {children}
      <AlertDialogConfirm />
      <AlertNotify />
    </AlertContext.Provider>
  )
}
