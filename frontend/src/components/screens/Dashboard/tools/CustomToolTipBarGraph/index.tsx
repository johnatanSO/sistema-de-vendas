import { format } from '../../../../../utils/format'
import style from './CustomToolTipBarGraph.module.scss'

interface Props {
  payload?: any
}

export function CustomTooltipBarGraph({ payload }: Props) {
  const [data] = payload

  return (
    <div className={style.tooltipContainer}>
      <b>{data?.payload?.label || '--'}</b>
      <p>{format.formatarReal(data?.payload.Valor || 0)}</p>
    </div>
  )
}
