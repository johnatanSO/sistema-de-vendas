import express from 'express'
import { AccountController } from '../controllers/AccountController'

const contasRoutes = express.Router()
const accountController = new AccountController()

contasRoutes.get('/', accountController.listAccounts)
contasRoutes.post('/', accountController.createNewAccount)
contasRoutes.put('/', accountController.updateAccount)
contasRoutes.delete('/', accountController.deleteAccount)

export { contasRoutes }
