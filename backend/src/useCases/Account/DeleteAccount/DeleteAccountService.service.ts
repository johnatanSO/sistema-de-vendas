import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../../repositories/Accounts/IAccountsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteAccountService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute(idAccount: any) {
    if (!idAccount) throw new AppError('_id da conta não informado')
    const accountNotFound = await this.accountsRepository.findById(idAccount)

    if (!accountNotFound) throw new AppError('Conta não encontrada')

    await this.accountsRepository.delete(idAccount)
  }
}
