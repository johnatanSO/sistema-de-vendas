import { ReactNode, createContext, useState } from 'react'
import { AlertDialogConfirm } from '../components/AlertDialogConfirm'
import { AlertNotify } from '../components/AlertNotify'

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
  type: 'success' | 'error'
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
      type: 'success',
      handleClose: onCloseNotify,
    })

  function onCloseNotify() {
    setAlertNotifyConfigs({
      ...alertNotifyConfigs,
      open: false,
      text: '',
      type: 'success',
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
