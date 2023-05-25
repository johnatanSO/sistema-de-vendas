import express, { Request, Response } from 'express'
const usersRoutes = express.Router()

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
  console.log(req.body)
})
export { usersRoutes }
