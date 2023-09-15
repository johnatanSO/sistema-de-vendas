import * as dotenv from 'dotenv'
import { IUsersRepository } from '../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'
dotenv.config()

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    _id: Types.ObjectId
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('E-mail e/ou senha incorretos')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new Error('E-mail e/ou senha incorretos')

    const token = sign({}, process.env.SECRET, {
      subject: user._id.toString(),
      expiresIn: '1d',
    })

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}
