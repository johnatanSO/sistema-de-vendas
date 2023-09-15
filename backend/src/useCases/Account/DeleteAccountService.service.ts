import { inject, injectable } from 'tsyringe'
import { IAccountsRepository } from '../../repositories/Accounts/IAccountsRepository'

@injectable()
export class DeleteAccountService {
  accountsRepository: IAccountsRepository
  constructor(
    @inject('AccountsRepository') accountsRepository: IAccountsRepository,
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute(idAccount: any) {
    const accountNotFound = await this.accountsRepository.findById(idAccount)

    if (!accountNotFound) {
      throw new Error('Conta não encontrada')
    }
    await this.accountsRepository.delete(idAccount)
  }
}
