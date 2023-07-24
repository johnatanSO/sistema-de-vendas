import { Types } from 'mongoose'

export interface Account {
  _id?: Types.ObjectId
  type: string
  userId: string
  code?: string
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

export interface IAccountsRepository {
  list: (QueryList: QueryList) => Promise<Account[]>
  create: (AccountData: Account) => Promise<Account>
  update: (AccountData: Account) => Promise<Account>
  delete: (idAccount: string) => void
  findById: (accountId: string | Types.ObjectId) => Promise<Account | null>
  getEntries: (userId: String) => Promise<number>
}
