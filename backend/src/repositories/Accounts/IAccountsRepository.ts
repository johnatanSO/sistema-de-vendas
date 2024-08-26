import { Types } from 'mongoose'
import { Account } from '../../entities/account'
import { ACCOUNT_STATUS } from '../../models/enums/AccountStatus'

export interface INewAccountDTO {
  type: 'in' | 'out'
  userId: string
  code: string
  description: string
  category: string
  value: number
}

export interface QueryList {
  accountType: 'in' | 'out' | ''
  userId: string
  startDate: any
  endDate: any
  status: ACCOUNT_STATUS
}

export interface UpdateParams {
  filters: any
  updateFields: any
}

export interface IAccountsRepository {
  list: (QueryList: QueryList) => Promise<Account[]>
  create: (AccountData: INewAccountDTO) => Promise<Account>
  update: (updateParams: UpdateParams) => Promise<void>
  delete: (idAccount: string) => Promise<void>
  findById: (accountId: string | Types.ObjectId) => Promise<Account>
  getEntries: (userId: string) => Promise<number>
}
