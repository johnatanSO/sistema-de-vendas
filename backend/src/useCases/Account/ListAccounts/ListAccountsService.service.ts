import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../../repositories/Accounts/IAccountsRepository'
import { Account } from '../../../entities/account'
import { AppError } from '../../../errors/AppError'
import { ACCOUNT_STATUS } from '../../../models/enums/AccountStatus'

interface IRequest {
  accountType: 'in' | 'out' | ''
  userId: string
  startDate: string
  endDate: string
  status: ACCOUNT_STATUS
}

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
    status,
  }: IRequest): Promise<Account[]> {
    if (!userId) throw new AppError('_id do usuário não foi informado')

    const accounts = await this.accountsRepository.list({
      accountType,
      userId,
      startDate,
      endDate,
      status,
    })

    return accounts
  }
}
