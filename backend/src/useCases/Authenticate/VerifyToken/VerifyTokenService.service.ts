import * as dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
dotenv.config()

@injectable()
export class VerifyTokenService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(token: string): Promise<boolean> {
    if (!token) throw new AppError('Token não enviado')

    const { sub: userId } = verify(token, process.env.SECRET)

    const user = await this.usersRepository.findById(userId.toString())

    if (!user) return false

    return true
  }
}
