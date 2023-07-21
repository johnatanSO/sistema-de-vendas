import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Account } from '..'
import { format } from '../../../utils/format'
import style from './Summary.module.scss'
import {
  faAngleDown,
  faAngleUp,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'

type SummaryProps = {
  accounts: Account[]
}

export function Summary({ accounts }: SummaryProps) {
  const summaryValues = accounts.reduce(
    (acc, account) => {
      if (account?.type === 'in') acc.inTotal += account.value
      if (account?.type === 'out') acc.outTotal -= account.value
      acc.totalValue += account.value
      return acc
    },
    {
      inTotal: 0,
      outTotal: 0,
      totalValue: 0,
    },
  )

  return (
    <ul className={style.listContainer}>
      <li className={style.inCard}>
        <header>
          <span>Entradas</span>
          <FontAwesomeIcon className={style.icon} icon={faAngleUp} />
        </header>
        <b>{format.formatarReal(summaryValues?.inTotal || 0)}</b>
      </li>

      <li className={style.outCard}>
        <header>
          <span>Saídas</span>
          <FontAwesomeIcon className={style.icon} icon={faAngleDown} />
        </header>
        <b>{format.formatarReal(summaryValues?.outTotal || 0)}</b>
      </li>

      <li className={style.totalCard}>
        <header>
          <span>Total</span>
          <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
        </header>
        <b>{format.formatarReal(summaryValues?.totalValue || 0)}</b>
      </li>
    </ul>
  )
}
