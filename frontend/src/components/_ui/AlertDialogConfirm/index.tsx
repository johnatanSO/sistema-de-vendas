import { useContext } from 'react'
import { AlertContext } from '../../../contexts/alertContext'
import style from './AlertDialogConfirm.module.scss'
import { Modal } from '@mui/material'

export function AlertDialogConfirm() {
  const { alertDialogConfirmConfigs: configs } = useContext(AlertContext)

  if (!configs.open) return <></>

  return (
    <Modal
      open={configs?.open}
      onClose={configs.handleClose}
      className={style.alertOverlay}
    >
      <div className={style.alertContainer}>
        <h3 className={style.title}>{configs?.title || '--'}</h3>
        <span className={style.text}>{configs?.text || '--'}</span>

        <div className={style.buttonsContainer}>
          <button
            className={`${style.button} ${style.cancelButton}`}
            onClick={configs.handleClose}
          >
            Cancelar
          </button>
          <button
            className={`${style.button} ${style.confirmButton}`}
            onClick={async () => {
              await configs.onClickAgree()
              configs.handleClose()
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  )
}
