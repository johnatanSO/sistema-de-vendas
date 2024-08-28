import { ACCOUNT_STATUS } from '../models/enums/AccountStatus'
import { ACCOUNT_TYPE } from '../models/enums/AccountType'

export interface GetAllAccountsDTO {
  filters: {
    type?: ACCOUNT_TYPE
    status?: ACCOUNT_STATUS
  }
}

export interface CreateAccountDTO {
  newAccountData: {
    value: number | string
  }
}

export interface UpdateAccountDTO {
  description: string
  type: string
  category: string
  value: number
  _id: string
}

export interface UpdateStatusAccountDTO {
  idAccount: string
  status: string
}

export interface DeleteAccountDTO {
  idAccount: string
}
