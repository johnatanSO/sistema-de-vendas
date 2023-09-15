import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../useCases/Authenticate/AuthenticateUserService.service'
import { VerifyTokenService } from '../useCases/Authenticate/VerifyTokenService.service'

export class AuthenticateController {
  async authenticateUser(req: Request, res: Response): Promise<Response> {
    try {
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
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
        token: null,
      })
    }
  }

  async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.body

      if (!token) throw new Error('Token não informado')

      const verifyTokenService = container.resolve(VerifyTokenService)
      const hasSession = await verifyTokenService.execute(token)

      if (!hasSession) throw new Error('Sessão inválida')

      return res.status(200).json({
        hasSession,
      })
    } catch (error: any) {
      return res.status(400).json({
        hasSession: false,
      })
    }
  }
}
