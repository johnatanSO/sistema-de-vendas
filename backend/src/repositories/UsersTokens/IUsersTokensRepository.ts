import { IUserToken } from "../../entities/userToken"

export interface ICreateUserTokenDTO {
  user: string
  expiresDate: Date
  refreshToken: string
}

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<IUserToken>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<IUserToken>
  deleteById(tokenId: string): Promise<void>
  findByRefreshToken(refreshToken: string): Promise<IUserToken>
}
