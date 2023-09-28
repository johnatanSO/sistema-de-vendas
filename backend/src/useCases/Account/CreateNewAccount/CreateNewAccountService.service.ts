import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../../repositories/Accounts/IAccountsRepository'
import { Account } from '../../../entities/account'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  type: 'in' | 'out'
  description: string
  category: string
  value: number
  userId: string
}

@injectable()
export class CreateNewAccountService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute({
    type,
    description,
    category,
    value,
    userId,
  }: IRequest): Promise<Account> {
    if (!userId) throw new AppError('_id do usuário não foi enviado')
    if (!type) throw new AppError('Nenhum tipo foi informado')
    if (!description) throw new AppError('Nenhuma descrição foi informada')

    const accountsAmount = await this.accountsRepository.getEntries(userId)
    const code = (accountsAmount + 1).toString()

    const newAccount = this.accountsRepository.create({
      code,
      description,
      value,
      type,
      category,
      userId,
    })

    return newAccount
  }
}
