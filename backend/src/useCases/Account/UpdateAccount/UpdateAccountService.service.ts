import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../../repositories/Accounts/IAccountsRepository'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  idAccount: string
  type: string
  description: string
  category: string
  value: number
  status: string
}

@injectable()
export class UpdateAccountService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute({
    idAccount,
    description,
    category,
    type,
    value,
    status,
  }: IRequest): Promise<void> {
    if (!idAccount) throw new AppError('_id da conta não foi informado')

    const accountNotFound = await this.accountsRepository.findById(idAccount)

    if (!accountNotFound) throw new AppError('Conta não encontrada')

    const filters = {
      _id: idAccount,
    }

    const updateFields = {
      $set: {
        category,
        type,
        value,
        description,
        status,
      },
    }

    await this.accountsRepository.update({
      filters,
      updateFields,
    })
  }
}
