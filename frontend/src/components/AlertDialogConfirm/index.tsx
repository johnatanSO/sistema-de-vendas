import { useContext } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import style from './AlertDialogConfirm.module.scss'
import { Modal } from '@mui/material'

export function AlertDialogConfirm() {
  const { alertDialogConfirmConfigs } = useContext(AlertContext)

  if (!alertDialogConfirmConfigs.open) return <></>

  return (
    <Modal
      open={alertDialogConfirmConfigs?.open}
      onClose={() => {}}
      className={style.alertOverlay}
    >
      <div className={style.alertContainer}>
        <h3 className={style.title}>
          {alertDialogConfirmConfigs?.title || '--'}
        </h3>
        <span className={style.text}>
          {alertDialogConfirmConfigs?.text || '--'}
        </span>

        <div className={style.buttonsContainer}>
          <button
            className={`${style.button} ${style.cancelButton}`}
            onClick={alertDialogConfirmConfigs.handleClose}
          >
            Cancelar
          </button>
          <button
            className={`${style.button} ${style.confirmButton}`}
            onClick={async () => {
              await alertDialogConfirmConfigs.onClickAgree()
              alertDialogConfirmConfigs.handleClose()
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  )
}
