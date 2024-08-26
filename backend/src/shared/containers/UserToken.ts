import { container } from 'tsyringe'
import { IUsersTokensRepository } from '../../repositories/UsersTokens/IUsersTokensRepository'
import { UsersTokensRepository } from '../../repositories/UsersTokens/UsersTokensRepository'

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)
