import { IUsersRepository } from '../repositories/Users/IUsersRepository'

export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(productsRepository: IUsersRepository) {
    this.usersRepository = productsRepository
  }

  async execute({ email, password }: any): Promise<any> {
    const user = await this.usersRepository.authenticate({ email, password })
    if (!user) {
      throw new Error('E-mail e/ou senha incorretos.')
    }

    return user
  }
}
