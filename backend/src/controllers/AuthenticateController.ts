import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../useCases/Authenticate/AuthenticateUser/AuthenticateUserService.service'
import { RefreshTokenService } from '../useCases/Authenticate/RefreshToken/RefreshTokenService.service'

export class AuthenticateController {
  async authenticateUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const authenticatedUser = await authenticateUserService.execute({
      email,
      password,
    })

    return res.status(200).json({
      success: true,
      user: authenticatedUser.user,
      token: authenticatedUser.token,
      refreshToken: authenticatedUser.refreshToken,
      message: 'Usuário autenticado com sucesso',
    })
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']

    const refreshTokenService = container.resolve(RefreshTokenService)
    const { refreshToken, newToken } = await refreshTokenService.execute(token)

    return res.status(200).json({
      success: true,
      token: newToken,
      refreshToken,
      message: "Tokens renovados com sucesso"
    })
  }
}
