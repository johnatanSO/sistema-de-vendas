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
  searchString: string
  userId: string
}

export interface IAccountsRepository {
  list: (QueryList: QueryList) => Promise<Account[]>
  create: (AccountData: Account) => Promise<Account>
  update: (AccountData: Account) => Promise<Account>
  delete: (idAccount: string) => void
  findByName: (name: string) => Promise<Account | null>
  findById: (accountId: string | Types.ObjectId) => Promise<Account | null>
  // updateStock: (account: Account) => void
  getEntries: (userId: String) => Promise<number>
}
