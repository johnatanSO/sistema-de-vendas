import { IAccountsRepository } from './../repositories/Accounts/IAccountsRepository'

export class DeleteAccountService {
  accountsRepository: IAccountsRepository
  constructor(accountsRepository: IAccountsRepository) {
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
