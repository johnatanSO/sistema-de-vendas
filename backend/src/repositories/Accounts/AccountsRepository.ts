import { Model } from 'mongoose'
import { Account, AccountModel } from '../../entities/account'
import {
  IAccountsRepository,
  INewAccountDTO,
  QueryList,
} from './IAccountsRepository'

export class AccountsRepository implements IAccountsRepository {
  model: Model<Account>
  constructor() {
    this.model = AccountModel
  }

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

    return await this.model.find(query)
  }

  async create({
    code,
    type,
    description,
    category,
    value,
    userId,
  }: INewAccountDTO): Promise<Account> {
    const newAccount = await this.model.create({
      code,
      type,
      description,
      category,
      value,
      userId,
    })

    await newAccount.save()

    return newAccount
  }

  async update({ filters, updateFields }: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }

  async delete(idAccount: string): Promise<void> {
    await this.model.deleteOne({ _id: idAccount })
  }

  async findById(accountId: string): Promise<Account> {
    return await this.model.findOne({ _id: accountId })
  }

  async getEntries(userId: string): Promise<number> {
    return await this.model.countDocuments({ userId })
  }
}
