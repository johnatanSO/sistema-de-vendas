import {
  IAccountsRepository,
  QueryList,
  UpdateParams,
} from './IAccountsRepository'
import { Account } from '../../entities/account'

export class MockAccountsRepository implements IAccountsRepository {
  accounts: Account[] = []

  async list(QueryList: QueryList): Promise<Account[]> {
    const accounts = this.accounts
    return accounts
  }

  async create(AccountData: Account): Promise<Account> {
    const newAccount: any = AccountData

    this.accounts.push(newAccount)

    return newAccount
  }

  async update({ filters, updateFields }: UpdateParams): Promise<void> {
    const fields = updateFields.$set

    const indexAccount = this.accounts.findIndex(
      (account) => account._id.toString() === filters._id.toString(),
    )

    if (indexAccount !== -1) {
      this.accounts[indexAccount] = {
        ...this.accounts[indexAccount],
        ...fields,
      }
    }
  }

  async delete(idAccount: string): Promise<void> {
    this.accounts = this.accounts.filter(
      (account) => account._id.toString() !== idAccount,
    )
  }

  async findById(accountId: string): Promise<Account> {
    return this.accounts.find((account) => account._id === accountId)
  }

  async getEntries(userId: string): Promise<number> {
    return this.accounts.filter(
      (account) => account.userId.toString() === userId,
    ).length
  }
}
