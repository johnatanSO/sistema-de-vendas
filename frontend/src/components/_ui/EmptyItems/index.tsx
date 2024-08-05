import style from './EmptyItems.module.scss'
import { XSquare } from '@phosphor-icons/react'

interface EmpytItems {
  text: string
  icon?: any
}

export function EmptyItems({ text, icon }: EmpytItems) {
  return (
    <div className={style.emptyItemsContainer}>
      <h2>{text}</h2>
      {icon || <XSquare size={32} />}
    </div>
  )
}
