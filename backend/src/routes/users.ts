import express from 'express'
import { UserController } from '../controllers/UserController'

const usersRoutes = express.Router()
const userController = new UserController()

usersRoutes.post('/', userController.createNewUser)

export { usersRoutes }
