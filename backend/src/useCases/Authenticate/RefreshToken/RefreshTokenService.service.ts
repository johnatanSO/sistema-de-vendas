import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "../../../repositories/UsersTokens/IUsersTokensRepository";
import { AppError } from "../../../errors/AppError";
import { sign, verify } from "jsonwebtoken";
import auth from "../../../config/auth";
import { IDateProvider } from "../../../shared/containers/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string
  email: string
}

interface IResponse  {
  refreshToken: string
  newToken: string
}

@injectable()
export class RefreshTokenService {
  usersTokensRepository: IUsersTokensRepository
  dateProvider: IDateProvider

  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider
  ) {
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
  }

  async execute(token: string): Promise<IResponse> {
    if (!token) throw new AppError('Refresh token não enviado')

    const { sub: userId, email } = verify(
      token,
      auth.secretRefreshToken,
    ) as IPayload

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      )

    if (!userToken) throw new AppError('Refresh token não encontrado')

    await this.usersTokensRepository.deleteById(userToken._id.toString())

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: userId,
      expiresIn: auth.expiresInRefreshToken,
    })

    const expiresDate = this.dateProvider.addDays(auth.expiresRefreshTokenDays)

    await this.usersTokensRepository.create({
      user: userId,
      refreshToken,
      expiresDate,
    })

    const newToken = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    })

    return { refreshToken, newToken }
  }
}