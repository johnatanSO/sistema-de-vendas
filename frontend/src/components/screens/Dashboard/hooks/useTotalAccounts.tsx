import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { IAccount } from '../../../../models/interfaces/IAccount'

export function useTotalAccounts(accounts: IAccount[]) {
  return accounts.reduce(
    (acc, account) => {
      if (account.type === ACCOUNT_TYPE.IN) acc.inTotalValue += account.value
      if (account.type === ACCOUNT_TYPE.OUT) acc.outTotalValue += account.value
      return acc
    },
    {
      inTotalValue: 0,
      outTotalValue: 0,
    },
  )
}
