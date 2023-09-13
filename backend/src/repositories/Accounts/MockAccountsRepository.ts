import { Types } from 'mongoose'
import { Account, IAccountsRepository, QueryList } from './IAccountsRepository'

export class MockAccountsRepository implements IAccountsRepository {
  accounts: Account[]
  constructor() {
    this.accounts = []
  }

  async list(QueryList: QueryList): Promise<Account[]> {
    const accounts = this.accounts
    return accounts
  }

  async create(AccountData: Account): Promise<Account> {
    const newAccount: any = AccountData

    this.accounts.push(newAccount)

    return newAccount
  }

  async update(AccountData: Account): Promise<Account> {
    this.accounts.forEach((account) => {
      if (account._id === AccountData._id) {
        account = {
          ...account,
          ...AccountData,
        }
      }
    })

    const updatedAccount: any = this.accounts.find(
      (account) => account._id === AccountData._id,
    )

    return updatedAccount
  }

  async delete(idAccount: string) {
    const newAccounts = this.accounts.filter(
      (account) => account._id.toString() !== idAccount,
    )
    this.accounts = newAccounts
  }

  async findById(accountId: string | Types.ObjectId): Promise<Account> {
    const account: any = this.accounts.find(
      (account) => account._id === accountId,
    )

    return account
  }

  async getEntries(userId: String): Promise<number> {
    const accountsAmount: any = this.accounts.length

    return accountsAmount
  }
}
