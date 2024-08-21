import { useContext, useEffect } from 'react'
import { AlertContext } from '../../../contexts/alertContext'
import style from './AlertNotify.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

export function AlertNotify() {
  const { alertNotifyConfigs: configs } = useContext(AlertContext)

  useEffect(() => {
    if (configs?.open) {
      setTimeout(() => {
        configs.handleClose()
      }, 7000)
    }
  }, [configs])

  if (!configs.open) return <></>
  return (
    <div
      className={
        configs?.type === 'success'
          ? `${style.alertContainer} ${style.success}`
          : `${style.alertContainer} ${style.error}`
      }
    >
      {configs?.type === 'success' ? (
        <FontAwesomeIcon className={style.icon} icon={faCheck} />
      ) : (
        <FontAwesomeIcon className={style.icon} icon={faExclamation} />
      )}

      <p>{configs?.text || '--'}</p>
      <button onClick={configs.handleClose}>
        <FontAwesomeIcon className={style.icon} icon={faXmark} />
      </button>
    </div>
  )
}
