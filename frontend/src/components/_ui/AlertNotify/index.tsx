import { useContext, useEffect } from 'react'
import { AlertContext } from '../../../contexts/alertContext'
import style from './AlertNotify.module.scss'
import { Check, ExclamationMark, X } from '@phosphor-icons/react'

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
        <Check weight="bold" size={23} />
      ) : (
        <ExclamationMark weight="bold" size={23} />
      )}

      <p>{configs?.text || '--'}</p>
      <button onClick={configs.handleClose}>
        <X weight="bold" size={23} />
      </button>
    </div>
  )
}
