import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../repositories/Accounts/IAccountsRepository'

@injectable()
export class ListAccountsService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute({
    accountType,
    userId,
    startDate,
    endDate,
  }: any): Promise<any> {
    const accounts = await this.accountsRepository.list({
      accountType,
      userId,
      startDate,
      endDate,
    })

    return accounts
  }
}
