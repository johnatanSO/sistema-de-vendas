import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

export interface INewAccount {
  description: string
  type: ACCOUNT_TYPE
  category: string
  value: string | number
}
