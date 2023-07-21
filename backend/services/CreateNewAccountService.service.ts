import {
  IAccountsRepository,
  Account,
} from './../repositories/Accounts/IAccountsRepository'

export class CreateNewAccountService {
  accountsRepository: IAccountsRepository
  constructor(accountsRepository: IAccountsRepository) {
    this.accountsRepository = accountsRepository
  }

  async execute({
    description,
    type,
    category,
    value,
    userId,
  }: Account): Promise<Account> {
    if (!type) throw new Error('Nenhum tipo foi informado')
    if (!description) throw new Error('Nenhuma descrição foi informada')

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
