import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import {
  IUsersRepository,
  User,
} from '../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
dotenv.config()

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
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
