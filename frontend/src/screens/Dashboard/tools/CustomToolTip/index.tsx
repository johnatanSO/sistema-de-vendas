import { format } from '../../../../utils/format'
import style from './CustomToolTip.module.scss'

export function CustomTooltip({
  active,
  payload,
  label,
  formatarReal,
  usarLabel = false,
  title = false,
}: any) {
  return (
    <div className={style.tooltip}>
      {title && <b>{label}</b>}
      {payload?.map((item: any, key: number) => (
        <p key={key} className="label">{`${usarLabel ? label : item.name} : 
						${formatarReal ? format.formatarReal(item?.value) : item?.value}`}</p>
      ))}
    </div>
  )
}
