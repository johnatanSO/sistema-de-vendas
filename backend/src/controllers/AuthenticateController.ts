import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../useCases/Authenticate/AuthenticateUser/AuthenticateUserService.service'
import { VerifyTokenService } from '../useCases/Authenticate/VerifyToken/VerifyTokenService.service'

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
      message: 'Usuário autenticado com sucesso',
    })
  }

  async verifyToken(req: Request, res: Response): Promise<Response> {
    const { token } = req.body

    if (!token) throw new Error('Token não informado')

    const verifyTokenService = container.resolve(VerifyTokenService)
    const hasSession = await verifyTokenService.execute(token)

    if (!hasSession) throw new Error('Sessão inválida')

    return res.status(200).json({
      success: true,
      hasSession,
    })
  }
}
