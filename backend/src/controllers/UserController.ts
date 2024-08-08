import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUser/CreateNewUserService.service'

export class UserController {
  async createNewUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = req.body

    const createNewUserService = container.resolve(CreateNewUserService)
    const newUser = await createNewUserService.execute({
      name,
      email,
      password,
      confirmPassword,
    })

    return res.status(201).json({
      success: true,
      item: newUser,
      message: 'Usuário cadastrado com sucesso',
    })
  }
}
