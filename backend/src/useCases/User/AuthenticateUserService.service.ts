import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { IUsersRepository, User } from '../repositories/Users/IUsersRepository'
dotenv.config()

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

  getToken(user: User): string | null {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 99999999,
    })
    return token
  }
}
