import { AccountModel } from '../../models/account'
import { IAccountsRepository, Account, QueryList } from './IAccountsRepository'

export class AccountsRepository implements IAccountsRepository {
  async list({
    startDate,
    endDate,
    accountType,
    userId,
  }: QueryList): Promise<Account[]> {
    const query = {
      userId,
      ...(accountType ? { type: accountType } : {}),
      ...(startDate && endDate
        ? { date: { $gte: startDate, $lt: endDate } }
        : {}),
    }

    return await AccountModel.find(query)
  }

  async create(AccountData: Account): Promise<Account> {
    const newAccount = new AccountModel(AccountData)
    await newAccount.save()

    return newAccount
  }

  async update(AccountData: Account): Promise<any> {
    return await AccountModel.updateOne(
      { _id: AccountData?._id },
      { $set: AccountData },
    )
  }

  async delete(idAccount: string) {
    await AccountModel.deleteOne({ _id: idAccount })
  }

  async findById(accountId: string): Promise<Account | null> {
    return await AccountModel.findOne({ _id: accountId })
  }

  async getEntries(userId: string): Promise<number> {
    return AccountModel.countDocuments({ userId })
  }
}
