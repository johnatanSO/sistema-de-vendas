import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'

export class UserController {
  async createNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body

      const createNewUserService = container.resolve(CreateNewUserService)
      const newUser = await createNewUserService.execute({
        name,
        email,
        password,
      })

      return res.status(201).json({
        item: newUser,
        message: 'Usuário cadastrado com sucesso!',
      })
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      })
    }
  }
}
