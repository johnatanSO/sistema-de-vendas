import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { format } from '../../../../utils/format'
import { Account } from '../interfaces/IAccount'
import style from './Summary.module.scss'
import { CaretDown, CaretUp, CurrencyDollar } from '@phosphor-icons/react'

type SummaryProps = {
  accounts: Account[]
}

export function Summary({ accounts }: SummaryProps) {
  const summaryValues = accounts.reduce(
    (acc, account) => {
      if (account?.type === ACCOUNT_TYPE.IN) acc.inTotal += account.value
      if (account?.type === ACCOUNT_TYPE.OUT) acc.outTotal -= account.value
      return acc
    },
    {
      inTotal: 0,
      outTotal: 0,
    },
  )

  return (
    <ul className={style.listContainer}>
      <li className={style.inCard}>
        <header>
          <span>Entradas</span>
          <CaretUp size={32} />
        </header>
        <b>{format.formatarReal(summaryValues?.inTotal || 0)}</b>
      </li>

      <li className={style.outCard}>
        <header>
          <span>Saídas</span>
          <CaretDown size={32} />
        </header>
        <b>{format.formatarReal(summaryValues?.outTotal || 0)}</b>
      </li>

      <li className={style.totalCard}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} />
        </header>
        <b>
          {format.formatarReal(
            summaryValues?.inTotal - summaryValues?.outTotal || 0,
          )}
        </b>
      </li>
    </ul>
  )
}
