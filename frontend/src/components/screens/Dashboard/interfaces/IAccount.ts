import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

export interface IAccount {
  type: ACCOUNT_TYPE
  value: number
}