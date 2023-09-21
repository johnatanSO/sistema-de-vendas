import { Types } from 'mongoose'
import { Account } from '../../entities/account'

export interface INewAccountDTO {
  type: string
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
