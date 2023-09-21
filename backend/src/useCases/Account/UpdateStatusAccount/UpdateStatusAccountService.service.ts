import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../../repositories/Accounts/IAccountsRepository'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  idAccount: string
  status: string
}

@injectable()
export class UpdateStatusAccountService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute({ idAccount, status }: IRequest): Promise<void> {
    if (!idAccount) throw new AppError('_id da conta não foi enviado')
    if (!status) throw new AppError("'status' não foi enviado")

    const filters = {
      _id: idAccount,
    }

    const updateFields = {
      $set: {
        status,
      },
    }

    await this.accountsRepository.update({
      filters,
      updateFields,
    })
  }
}
