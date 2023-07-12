import { useContext, useEffect } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import style from './AlertNotify.module.scss'

export function AlertNotify() {
  const { alertNotifyConfigs } = useContext(AlertContext)

  useEffect(() => {
    if (alertNotifyConfigs?.open) {
      setTimeout(() => {
        alertNotifyConfigs.handleClose()
      }, 7000)
    }
  }, [alertNotifyConfigs])

  if (!alertNotifyConfigs.open) return <></>
  return (
    <div
      className={
        alertNotifyConfigs?.type === 'success'
          ? `${style.alertContainer} ${style.success}`
          : `${style.alertContainer} ${style.error}`
      }
    >
      <FontAwesomeIcon
        icon={
          alertNotifyConfigs?.type === 'success' ? faCheck : faCircleExclamation
        }
        className={style.alertIcon}
      />
      <p>{alertNotifyConfigs?.text || '--'}</p>
      <button onClick={alertNotifyConfigs.handleClose}>
        <FontAwesomeIcon icon={faXmark} style={{ height: '1.5rem' }} />
      </button>
    </div>
  )
}
