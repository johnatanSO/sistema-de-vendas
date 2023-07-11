import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ActionButtons.module.scss'

type Props = {
  actions: any[]
  params: any
}

export function ActionButtons({ actions, params }: Props) {
  return (
    <div className={style.actionsContainer}>
      {actions?.map((action, key) => {
        return (
          <button
            style={{ color: action?.color || '' }}
            key={key}
            type="button"
          >
            <FontAwesomeIcon className={style.icon} icon={action.icon} />
          </button>
        )
      })}
    </div>
  )
}
