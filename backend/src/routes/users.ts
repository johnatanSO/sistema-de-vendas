import express, { Request, Response } from 'express'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'
import { AuthenticateUserService } from '../useCases/User/AuthenticateUserService.service'
import { UsersRepository } from '../repositories/Users/UsersRepository'
const usersRoutes = express.Router()

const usersRepository = new UsersRepository()

// TO-DO: Implementar verificação de sessão do usuário.
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
    const newUser = await createNewUserService.execute({
      name,
      email,
      password,
    })

    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const token = authenticateUserService.getToken(newUser)

    res.status(201).json({
      item: newUser,
      token,
      message: 'Usuário cadastrado com sucesso!',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      token: null,
    })
  }
})

// TO-DO: Implementar token JWT.
usersRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const user = await authenticateUserService.execute({
      email,
      password,
    })

    const token = authenticateUserService.getToken(user)

    res.status(200).json({
      item: user,
      token,
      message: 'Usuário autenticado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      token: null,
    })
  }
})
export { usersRoutes }
