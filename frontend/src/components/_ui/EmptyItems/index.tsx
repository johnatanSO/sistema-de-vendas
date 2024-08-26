import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EmptyItems.module.scss'
import {
  faSquareXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  text: string
  icon?: IconDefinition
}

export function EmptyItems({ text, icon }: Props) {
  return (
    <div className={style.emptyItemsContainer}>
      <h2>{text}</h2>
      <FontAwesomeIcon icon={icon || faSquareXmark} className={style.icon} />
    </div>
  )
}
