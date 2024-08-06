import { IAccount } from '../interfaces/IAccount'

export function useTotalAccounts(accounts: IAccount[]) {
  return accounts.reduce(
    (acc, account) => {
      if (account.type === 'in') acc.inTotalValue += account.value
      if (account.type === 'out') acc.outTotalValue += account.value
      acc.totalValueAccounts = account.value
      return acc
    },
    {
      inTotalValue: 0,
      outTotalValue: 0,
      totalValueAccounts: 0,
    },
  )
}
