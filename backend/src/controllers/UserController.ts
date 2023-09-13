import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../useCases/User/AuthenticateUserService.service'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'

export class UserController {
  async getSession(req: Request, res: Response): Promise<Response> {
    try {
      const token = ''
      return res.status(200).json({
        token,
        message: 'Usuário autenticado',
      })
    } catch (err) {
      return res
        .status(400)
        .json({ error: err, message: 'Usuário não autenticado', token: null })
    }
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body

      const createNewUserService = container.resolve(CreateNewUserService)
      const newUser = await createNewUserService.execute({
        name,
        email,
        password,
      })

      const authenticateUserService = container.resolve(AuthenticateUserService)
      const token = authenticateUserService.getToken(newUser)

      return res.status(201).json({
        item: newUser,
        token,
        message: 'Usuário cadastrado com sucesso!',
      })
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
        token: null,
      })
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const authenticateUserService = container.resolve(AuthenticateUserService)
      const user = await authenticateUserService.execute({
        email,
        password,
      })

      const token = authenticateUserService.getToken(user)

      return res.status(200).json({
        item: user,
        token,
        message: 'Usuário autenticado com sucesso',
      })
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
        token: null,
      })
    }
  }
}
