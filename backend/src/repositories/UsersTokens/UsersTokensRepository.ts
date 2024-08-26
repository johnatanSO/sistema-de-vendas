import { Model } from 'mongoose'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from './IUsersTokensRepository'
import { IUserToken, UserTokenModel } from '../../entities/userToken'

export class UsersTokensRepository implements IUsersTokensRepository {
  private model: Model<IUserToken>
  constructor() {
    this.model = UserTokenModel
  }

  async create({
    user,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const token = await this.model.create({
      user,
      expiresDate,
      refreshToken,
    })

    await token.save()

    return token
  }

  async findByUserIdAndRefreshToken(
    user: string,
    refreshToken: string,
  ): Promise<IUserToken> {
    return await this.model.findOne({ user, refreshToken })
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.model.deleteOne({ _id: tokenId })
  }

  async findByRefreshToken(refreshToken: string): Promise<IUserToken> {
    return await this.model.findOne({ refreshToken })
  }
}
