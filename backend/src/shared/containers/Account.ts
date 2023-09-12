import { IAccountsRepository } from '../../repositories/Accounts/IAccountsRepository'
import { AccountsRepository } from '../../repositories/Accounts/AccountsRepository'
import { container } from 'tsyringe'

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
)
