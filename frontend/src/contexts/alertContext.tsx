import { ReactNode, createContext, useState } from 'react'
import { AlertDialogConfirm } from '../components/_ui/AlertDialogConfirm'
import { AlertNotify } from '../components/_ui/AlertNotify'
import { ALERT_NOTIFY_TYPE } from '../models/enums/AlertNotifyType'

interface AlertContextComponentProps {
  children: ReactNode
}

interface AlertDialogConfirmConfigs {
  open: boolean
  title: string
  text: string
  handleClose: () => void
  onClickAgree: () => void
}

interface AlertNotifyConfigs {
  open: boolean
  type: ALERT_NOTIFY_TYPE
  text: string
  handleClose: () => void
}

export const AlertContext = createContext({} as any)

export function AlertContextComponent({
  children,
}: AlertContextComponentProps) {
  const [alertDialogConfirmConfigs, setAlertDialogConfirmConfigs] =
    useState<AlertDialogConfirmConfigs>({
      open: false,
      title: '',
      text: '',
      handleClose: onCloseAlertDialogConfirm,
      onClickAgree: () => {},
    })

  const [alertNotifyConfigs, setAlertNotifyConfigs] =
    useState<AlertNotifyConfigs>({
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
      onClickAgree: () => {},
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
