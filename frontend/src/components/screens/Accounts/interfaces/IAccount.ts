import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

export interface IAccount {
  _id: string
  description: string
  type: ACCOUNT_TYPE
  value: number
  status: string
  category: string
}
