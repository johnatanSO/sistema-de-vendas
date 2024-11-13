import * as dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { AppError } from '../../../errors/AppError'
import auth from '../../../config/auth'
import { IUsersTokensRepository } from '../../../repositories/UsersTokens/IUsersTokensRepository'
import { IDateProvider } from '../../../shared/containers/providers/DateProvider/IDateProvider'
dotenv.config()

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    _id: Types.ObjectId | string
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  usersTokensRepository: IUsersTokensRepository
  dateProvider: IDateProvider

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository, 
    @inject('UsersTokensRepository') 
      usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider
  ) {
    this.usersRepository = usersRepository
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email) throw new AppError('E-mail não enviado')
    if (!password) throw new AppError('Senha não enviada')

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('E-mail e/ou senha incorretos')
    
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new AppError('E-mail e/ou senha incorretos')

    const { 
      secretToken, 
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays
    } = auth

    const token = sign({}, secretToken, {
      subject: user._id.toString(),
      expiresIn: expiresInToken,
    })

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user._id.toString(),
      expiresIn: expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(expiresRefreshTokenDays)

    await this.usersTokensRepository.create({
      user: user._id.toString(),
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    }
  }
}
