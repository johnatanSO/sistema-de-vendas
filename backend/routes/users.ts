import express, { Request, Response } from 'express'
import { CreateNewUserService } from '../services/CreateNewUserService.service'
import { UsersRepository } from '../repositories/Users/UsersRepository'
import { AuthenticateUserService } from '../services/AuthenticateUserService.service'
const usersRoutes = express.Router()

const usersRepository = new UsersRepository()

usersRoutes.get('/session', async (req: Request, res: Response) => {
  try {
    const token = ''
    res.status(200).json({
      token,
      message: 'Usuário autenticado',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Usuário não autenticado', token: null })
  }
})

usersRoutes.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  try {
    const createNewUserService = new CreateNewUserService(usersRepository)
    const newProduct = await createNewUserService.execute({
      name,
      email,
      password,
    })

    res.status(201).json({
      item: newProduct,
      message: 'Usuário cadastrado com sucesso!',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    })
  }
})

usersRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const user = await authenticateUserService.execute({
      email,
      password,
    })

    res.status(200).json({
      item: user,
      message: 'Usuário encontrado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    })
  }
})
export { usersRoutes }
