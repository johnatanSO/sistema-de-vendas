import { IUsersRepository } from '../repositories/Users/IUsersRepository'

export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(productsRepository: IUsersRepository) {
    this.usersRepository = productsRepository
  }

  async execute({ email, password }: any): Promise<any> {
    const emailFinded = await this.usersRepository.findByEmail(email)
    if (!emailFinded) {
      throw new Error('Nenhum usuário encontrado com este e-mail')
    }

    const user = await this.usersRepository.authenticate(password)
    if (!user) {
      throw new Error('Senha incorreta')
    }

    return user
  }
}
