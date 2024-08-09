import { format } from '../../../../../utils/format'
import style from './CustomToolTipPizzaGraph.module.scss'

interface Props {
  payload?: any
}

export function CustomTooltipPizzaGraph({ payload }: Props) {
  const [data] = payload

  return (
    <div className={style.tooltipContainer}>
      <b>{data?.name || '--'}</b>
      <p>{data?.payload.amount || 0}x</p>
      <p>{format.formatarReal(data?.payload.value || 0)}</p>
    </div>
  )
}
