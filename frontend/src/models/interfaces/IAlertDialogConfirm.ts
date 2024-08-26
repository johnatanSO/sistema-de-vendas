export interface IAlertDialogConfirm {
  open: boolean
  title: string
  text: string
  handleClose: () => void
  onClickAgree: () => void
}
