import style from './EmptyItems.module.scss'

interface EmpytItems {
  text: string
  icon?: any
}

export function EmptyItems({ text, icon }: EmpytItems) {
  return (
    <div className={style.emptyItemsContainer}>
      <h2>{text}</h2>
      {icon || <XSquare size={70} />}
    </div>
  )
}
