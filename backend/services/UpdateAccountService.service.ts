import {
  Account,
  IAccountsRepository,
} from './../repositories/Accounts/IAccountsRepository'

export class UpdateNewAccountService {
  accountsRepository: IAccountsRepository
  constructor(accountsRepository: IAccountsRepository) {
    this.accountsRepository = accountsRepository
  }

  async execute(accountData: Account): Promise<any> {
    const accountNotFound = await this.accountsRepository.findById(
      accountData?._id,
    )

    if (!accountNotFound) {
      throw new Error('Conta não encontrada')
    }

    const accountUpdated = await this.accountsRepository.update(accountData)
    return accountUpdated
  }
}
