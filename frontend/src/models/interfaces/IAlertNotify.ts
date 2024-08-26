import { ALERT_NOTIFY_TYPE } from '../enums/AlertNotifyType'

export interface IAlertNotify {
  open: boolean
  type: ALERT_NOTIFY_TYPE
  text: string
  handleClose: () => void
}
