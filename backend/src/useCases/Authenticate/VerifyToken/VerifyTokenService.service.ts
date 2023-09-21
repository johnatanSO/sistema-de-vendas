import * as dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { verify } from 'jsonwebtoken'
dotenv.config()

@injectable()
export class VerifyTokenService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(token: string): Promise<boolean> {
    const { sub: userId } = verify(token, process.env.SECRET)

    const user = await this.usersRepository.findById(userId.toString())

    if (!user) return false

    return true
  }
}
