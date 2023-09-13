import express from 'express'
import { UserController } from '../controllers/UserController'

const usersRoutes = express.Router()
const userController = new UserController()

usersRoutes.get('/session', userController.getSession)
usersRoutes.post('/register', userController.createNewUser)
usersRoutes.post('/login', userController.login)

export { usersRoutes }
