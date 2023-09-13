import { container } from 'tsyringe'
import { UsersRepository } from '../../repositories/Users/UsersRepository'
import { IUsersRepository } from '../../repositories/Users/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
